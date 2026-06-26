import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { randomBytes, scryptSync, timingSafeEqual } from 'crypto'
import { User } from '../users/user.entity'
import { UsersService } from '../users/users.service'

@Injectable()
export class AuthService {
  constructor(
    private readonly users: UsersService,
    private readonly jwt: JwtService,
  ) {}

  async register(username: string, email: string, password: string) {
    const existing = await this.users.findByEmail(email)
    if (existing) throw new ConflictException('Email already in use')
    const hashed = this.hashPassword(password)
    const user = await this.users.create({ username, email, password: hashed })
    const { password: _, ...safe } = user
    return safe
  }

  async login(email: string, password: string) {
    const user = await this.users.findByEmail(email)
    if (!user) throw new UnauthorizedException('Invalid credentials')
    if (!user.enabled) throw new UnauthorizedException('Account disabled')
    if (!user.verifiedAt) throw new UnauthorizedException('Account not verified')
    if (!this.checkPassword(password, user.password)) {
      throw new UnauthorizedException('Invalid credentials')
    }
    return { access_token: this.sign(user) }
  }

  async refresh(token: string) {
    let payload: { sub: number; tokenVersion: number }
    try {
      payload = this.jwt.verify(token, { ignoreExpiration: true })
    } catch {
      throw new UnauthorizedException('Invalid token')
    }

    const user = await this.users.findById(payload.sub)
    if (!user || !user.enabled || !user.verifiedAt || user.tokenVersion !== payload.tokenVersion) {
      throw new UnauthorizedException()
    }
    return { access_token: this.sign(user) }
  }

  async logout(userId: number) {
    await this.users.incrementTokenVersion(userId)
  }

  private sign(user: Pick<User, 'id' | 'email' | 'tokenVersion'>) {
    return this.jwt.sign({ sub: user.id, email: user.email, tokenVersion: user.tokenVersion })
  }

  // ponytail: native crypto.scrypt — same security as bcrypt, no extra dep
  private hashPassword(plain: string): string {
    const salt = randomBytes(16).toString('hex')
    return `${salt}:${scryptSync(plain, salt, 64).toString('hex')}`
  }

  private checkPassword(plain: string, stored: string): boolean {
    const [salt, hash] = stored.split(':')
    if (!salt || !hash) return false
    const incoming = scryptSync(plain, salt, 64)
    return timingSafeEqual(incoming, Buffer.from(hash, 'hex'))
  }
}

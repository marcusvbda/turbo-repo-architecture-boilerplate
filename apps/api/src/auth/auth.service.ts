import { BadRequestException, ConflictException, Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { randomBytes, scryptSync, timingSafeEqual } from 'crypto'
import { EmailService } from '../email/email.service'
import { User } from '../users/user.entity'
import { UsersService } from '../users/users.service'

@Injectable()
export class AuthService {
  constructor(
    private readonly users: UsersService,
    private readonly jwt: JwtService,
    private readonly email: EmailService,
  ) {}

  async register(username: string, email: string, password: string) {
    const existing = await this.users.findByEmail(email)
    if (existing) throw new ConflictException('Email already in use')
    const hashed = this.hashPassword(password)
    const user = await this.users.create({ username, email, password: hashed })

    const token = randomBytes(32).toString('hex')
    const expiry = new Date(Date.now() + 24 * 60 * 60 * 1000)
    await this.users.setEmailConfirmToken(user.id, token, expiry)

    const url = `${process.env.APP_URL}/auth/confirm-email?token=${token}`
    void this.email.send(email, 'Confirm your email', `
      <p>Hi ${username},</p>
      <p>Click the link below to confirm your email. It expires in 24 hours.</p>
      <a href="${url}">${url}</a>
    `)

    return { message: 'Check your email to confirm your account' }
  }

  async confirmEmail(token: string) {
    const user = await this.users.findByEmailConfirmToken(token)
    if (!user || !user.emailConfirmTokenExpiry || user.emailConfirmTokenExpiry < new Date()) {
      throw new BadRequestException('Invalid or expired token')
    }
    await this.users.confirmEmail(user.id)
    return { message: 'Email confirmed' }
  }

  async forgotPassword(email: string) {
    const user = await this.users.findByEmail(email)
    if (!user) return { message: 'If this email exists, a reset link was sent' }

    const token = randomBytes(32).toString('hex')
    const expiry = new Date(Date.now() + 60 * 60 * 1000)
    await this.users.setResetToken(user.id, token, expiry)

    const url = `${process.env.APP_URL}/auth/reset-password?token=${token}`
    void this.email.send(email, 'Reset your password', `
      <p>Click the link below to reset your password. It expires in 1 hour.</p>
      <a href="${url}">${url}</a>
      <p>If you didn't request this, ignore this email.</p>
    `)

    return { message: 'If this email exists, a reset link was sent' }
  }

  async validateResetToken(token: string) {
    const user = await this.users.findByResetToken(token)
    if (!user || !user.resetPasswordTokenExpiry || user.resetPasswordTokenExpiry < new Date()) {
      throw new BadRequestException('Invalid or expired token')
    }
    return { valid: true }
  }

  async resetPassword(token: string, password: string) {
    const user = await this.users.findByResetToken(token)
    if (!user || !user.resetPasswordTokenExpiry || user.resetPasswordTokenExpiry < new Date()) {
      throw new BadRequestException('Invalid or expired token')
    }
    await this.users.updatePassword(user.id, this.hashPassword(password))
    return { message: 'Password reset successfully' }
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

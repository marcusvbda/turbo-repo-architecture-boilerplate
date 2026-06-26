import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UsersService } from '../users/users.service'

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly jwt: JwtService,
    private readonly users: UsersService,
  ) {}

  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const req = ctx.switchToHttp().getRequest()
    const token = req.headers.authorization?.replace('Bearer ', '')
    if (!token) throw new UnauthorizedException()

    let payload: { sub: number; tokenVersion: number }
    try {
      payload = this.jwt.verify(token)
    } catch {
      throw new UnauthorizedException('Invalid or expired token')
    }

    const user = await this.users.findById(payload.sub)
    if (!user || !user.enabled || user.tokenVersion !== payload.tokenVersion) {
      throw new UnauthorizedException()
    }

    req.user = user
    return true
  }
}

import { Body, Controller, Get, HttpCode, Post, Query, Req, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'
import { AuthService } from './auth.service'
import { ConfirmEmailDto } from './dto/confirm-email.dto'
import { ForgotPasswordDto } from './dto/forgot-password.dto'
import { LoginDto } from './dto/login.dto'
import { RefreshDto } from './dto/refresh.dto'
import { RegisterDto } from './dto/register.dto'
import { ResetPasswordDto } from './dto/reset-password.dto'
import { JwtAuthGuard } from './auth.guard'

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  register(@Body() dto: RegisterDto) {
    return this.auth.register(dto.username, dto.email, dto.password)
  }

  @Post('login')
  @HttpCode(200)
  @ApiOperation({ summary: 'Login with email and password' })
  login(@Body() dto: LoginDto) {
    return this.auth.login(dto.email, dto.password)
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get current authenticated user' })
  me(@Req() req: { user: Record<string, unknown> }) {
    const { password, tokenVersion, ...user } = req.user
    return user
  }

  @Post('refresh')
  @HttpCode(200)
  @ApiOperation({ summary: 'Revalidate an expired token' })
  refresh(@Body() dto: RefreshDto) {
    return this.auth.refresh(dto.token)
  }

  @Post('logout')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Logout and invalidate current token' })
  async logout(@Req() req: { user: { id: number } }) {
    await this.auth.logout(req.user.id)
    return { message: 'Logged out' }
  }

  @Post('confirm-email')
  @HttpCode(200)
  @ApiOperation({ summary: 'Confirm email with token from email link' })
  confirmEmail(@Body() dto: ConfirmEmailDto) {
    return this.auth.confirmEmail(dto.token)
  }

  @Post('forgot-password')
  @HttpCode(200)
  @ApiOperation({ summary: 'Send password reset email' })
  forgotPassword(@Body() dto: ForgotPasswordDto) {
    return this.auth.forgotPassword(dto.email)
  }

  @Get('validate-reset-token')
  @ApiOperation({ summary: 'Check if a reset token is valid without consuming it' })
  validateResetToken(@Query('token') token: string) {
    return this.auth.validateResetToken(token)
  }

  @Post('reset-password')
  @HttpCode(200)
  @ApiOperation({ summary: 'Reset password with token from email link' })
  resetPassword(@Body() dto: ResetPasswordDto) {
    return this.auth.resetPassword(dto.token, dto.password)
  }
}

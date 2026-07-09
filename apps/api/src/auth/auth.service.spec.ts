import { UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import { AuthService } from './auth.service'
import { EmailService } from '../email/email.service'
import { UsersService } from '../users/users.service'

const base = {
  id: 1,
  email: 'a@b.com',
  // scryptSync('correct', 'aabbccdd', 64).toString('hex') — pre-computed for speed
  password: 'aabbccdd:' + require('crypto').scryptSync('correct', 'aabbccdd', 64).toString('hex'),
  enabled: true,
  verifiedAt: new Date(),
  tokenVersion: 0,
  failedLoginAttempts: 0,
  lockedUntil: null,
}

describe('AuthService.login', () => {
  let service: AuthService
  let users: { findByEmail: jest.Mock; setFailedLoginAttempts: jest.Mock }

  beforeEach(async () => {
    users = { findByEmail: jest.fn(), setFailedLoginAttempts: jest.fn() }
    const mod = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: JwtService, useValue: { sign: () => 'tok' } },
        { provide: UsersService, useValue: users },
        { provide: EmailService, useValue: { send: jest.fn() } },
      ],
    }).compile()
    service = mod.get(AuthService)
  })

  it('throws when user not found', async () => {
    users.findByEmail.mockResolvedValue(null)
    await expect(service.login('x@x.com', 'p')).rejects.toThrow(UnauthorizedException)
  })

  it('throws when disabled', async () => {
    users.findByEmail.mockResolvedValue({ ...base, enabled: false })
    await expect(service.login('x@x.com', 'p')).rejects.toThrow(UnauthorizedException)
  })

  it('throws when not verified', async () => {
    users.findByEmail.mockResolvedValue({ ...base, verifiedAt: null })
    await expect(service.login('x@x.com', 'p')).rejects.toThrow(UnauthorizedException)
  })

  it('throws on wrong password', async () => {
    users.findByEmail.mockResolvedValue(base)
    await expect(service.login('x@x.com', 'wrong')).rejects.toThrow(UnauthorizedException)
  })

  it('returns access_token on valid login', async () => {
    users.findByEmail.mockResolvedValue(base)
    const result = await service.login('a@b.com', 'correct')
    expect(result).toHaveProperty('access_token')
  })

  it('throws when account is locked', async () => {
    users.findByEmail.mockResolvedValue({ ...base, lockedUntil: new Date(Date.now() + 60_000) })
    await expect(service.login('a@b.com', 'correct')).rejects.toThrow(UnauthorizedException)
  })

  it('locks the account after reaching max failed attempts', async () => {
    users.findByEmail.mockResolvedValue({ ...base, failedLoginAttempts: 4 })
    await expect(service.login('a@b.com', 'wrong')).rejects.toThrow(UnauthorizedException)
    expect(users.setFailedLoginAttempts).toHaveBeenCalledWith(1, 5, expect.any(Date))
  })

  it('resets failed attempts on successful login', async () => {
    users.findByEmail.mockResolvedValue({ ...base, failedLoginAttempts: 2 })
    await service.login('a@b.com', 'correct')
    expect(users.setFailedLoginAttempts).toHaveBeenCalledWith(1, 0, null)
  })
})

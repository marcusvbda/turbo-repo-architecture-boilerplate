import { UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import { AuthService } from './auth.service'
import { UsersService } from '../users/users.service'

const base = {
  id: 1,
  email: 'a@b.com',
  // scryptSync('correct', 'aabbccdd', 64).toString('hex') — pre-computed for speed
  password: 'aabbccdd:' + require('crypto').scryptSync('correct', 'aabbccdd', 64).toString('hex'),
  enabled: true,
  verifiedAt: new Date(),
  tokenVersion: 0,
}

describe('AuthService.login', () => {
  let service: AuthService
  let users: { findByEmail: jest.Mock }

  beforeEach(async () => {
    users = { findByEmail: jest.fn() }
    const mod = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: JwtService, useValue: { sign: () => 'tok' } },
        { provide: UsersService, useValue: users },
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
})

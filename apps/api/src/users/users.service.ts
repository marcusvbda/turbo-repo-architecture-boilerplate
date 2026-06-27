import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from './user.entity'

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private readonly repo: Repository<User>) {}

  findByEmail(email: string) {
    return this.repo.findOne({ where: { email } })
  }

  findById(id: number) {
    return this.repo.findOne({ where: { id } })
  }

  create(data: Pick<User, 'username' | 'email' | 'password'>) {
    return this.repo.save(this.repo.create(data))
  }

  incrementTokenVersion(id: number) {
    return this.repo.increment({ id }, 'tokenVersion', 1)
  }

  findByEmailConfirmToken(token: string) {
    return this.repo.findOne({ where: { emailConfirmToken: token } })
  }

  confirmEmail(id: number) {
    return this.repo.update(id, { verifiedAt: new Date(), emailConfirmToken: null, emailConfirmTokenExpiry: null })
  }

  setEmailConfirmToken(id: number, token: string, expiry: Date) {
    return this.repo.update(id, { emailConfirmToken: token, emailConfirmTokenExpiry: expiry })
  }

  findByResetToken(token: string) {
    return this.repo.findOne({ where: { resetPasswordToken: token } })
  }

  setResetToken(id: number, token: string, expiry: Date) {
    return this.repo.update(id, { resetPasswordToken: token, resetPasswordTokenExpiry: expiry })
  }

  updatePassword(id: number, password: string) {
    return this.repo.update(id, { resetPasswordToken: null, resetPasswordTokenExpiry: null, password })
  }
}

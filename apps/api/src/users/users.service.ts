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
}

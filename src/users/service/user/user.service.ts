import { AppException } from '@/shared/exceptions/app-exception'
import { UserRepository } from '@/users/repository/user/user-repository'
import { Injectable } from '@nestjs/common'
import Filter from 'bad-words'

@Injectable()
export class UserService {
  constructor (
    private readonly userRepository: UserRepository
  ) {}

  async checkUsernameIsAvailable (username: string): Promise<void> {
    const filter = new Filter()
    const result = filter.isProfane(username)
    if (result) {
      throw new AppException('Username with bad words')
    }

    const user = await this.userRepository.findByUsername(username)
    if (user) {
      throw new AppException('Username already exists')
    }

    await Promise.resolve()
  }
}

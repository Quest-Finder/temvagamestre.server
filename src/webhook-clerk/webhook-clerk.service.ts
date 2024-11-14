import { AppException } from '@/shared/exceptions/app-exception'
import { UserRepository } from '@/users/repository/user/user-repository'
import { Injectable } from '@nestjs/common'

export type WebhookUserInput = {
  externalAuthUserId: string
  name: string
  email: string
}

@Injectable()
export class WebhookClerkService {
  constructor (private readonly userRepository: UserRepository) {}

  async create ({ email, externalAuthUserId, name }: WebhookUserInput): Promise<void> {
    const existsUser = await this.userRepository.findByEmail(email)
    if (existsUser) {
      throw new AppException('Email already exists')
    }
    const existsUserWithExternalUserId = await this.userRepository.findByExternalAuthId(externalAuthUserId)
    if (existsUserWithExternalUserId) {
      throw new AppException('External Auth Id already exists')
    }
    await this.userRepository.createUser({
      email, name, externalAuthId: externalAuthUserId
    })
    await Promise.resolve()
  }
}

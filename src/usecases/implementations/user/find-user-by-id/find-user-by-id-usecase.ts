import { type FindUserById, type FindUserByIdData, type FindUserByIdResponse } from '@/domain/contracts/user'
import { right } from '@/shared/either'
import { type FindUserByIdRepo } from '@/usecases/contracts/db/user'

export class FindUserByIdUseCase implements FindUserById {
  constructor (private readonly findUserByIdRepo: FindUserByIdRepo) {}

  async perform ({ userId }: FindUserByIdData): Promise<FindUserByIdResponse> {
    await this.findUserByIdRepo.execute(userId)

    return right({
      id: 'string',
      firstName: 'string',
      lastName: 'string',
      email: 'string'
    })
  }
}

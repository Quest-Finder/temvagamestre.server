import { type FindUserById, type FindUserByIdData, type FindUserByIdResponse } from '@/domain/contracts/user'
import { UserNotExitsError } from '@/domain/errors'
import { left, right } from '@/shared/either'
import { type FindUserByIdRepo } from '@/usecases/contracts/db/user'

export class FindUserByIdUseCase implements FindUserById {
  constructor (private readonly findUserByIdRepo: FindUserByIdRepo) {}

  async perform ({ userId }: FindUserByIdData): Promise<FindUserByIdResponse> {
    const user = await this.findUserByIdRepo.execute(userId)
    if (!user) {
      return left(new UserNotExitsError(userId))
    }
    return right(user)
  }
}

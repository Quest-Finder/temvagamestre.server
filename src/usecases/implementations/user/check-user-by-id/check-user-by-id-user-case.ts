import { type CheckUserById, type CheckUserByIdResponse } from '@/contracts/user/check-by-id'
import { left, right } from '@/shared/either'
import { type FindUserByIdRepo } from '@/usecases/contracts/db/user/find-user-by-id-repo'

export class CheckUserByIdUseCase implements CheckUserById {
  constructor (private readonly findUserByIdRepository: FindUserByIdRepo) {}

  async perform (id: string): Promise<CheckUserByIdResponse> {
    const findUser = await this.findUserByIdRepository.execute(id)
    if (findUser === null) {
      return left(new Error('User not found'))
    }
    return right(findUser)
  }
}

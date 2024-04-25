import { type CheckUsername, type CheckUsernameResponse } from '@/domain/contracts/user/check-username'
import { left, right } from '@/shared/either'
import { type FindUserByUsernameRepo } from '@/usecases/contracts/db/user/find-user-by-username-repo'

export class CheckUsernameUseCase implements CheckUsername {
  constructor (private readonly findUserByUsernameRepo: FindUserByUsernameRepo) {}

  async perform (username: string): Promise<CheckUsernameResponse> {
    const exitsUsername = await this.findUserByUsernameRepo.execute(username)
    if (exitsUsername) {
      return left(new Error('Username already exists'))
    }
    return right()
  }
}

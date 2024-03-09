import type { RegisterUser, RegisterUserResponse } from '@/domain/contracts/user'
import { User, type RegisterUserData } from '@/domain/entities/user'
import { left, right } from '@/shared/either'
import { type RegisterUserRepo } from '@/usecases/contracts/db/user'

export class RegisterUserUseCase implements RegisterUser {
  constructor (private readonly registerUserRepo: RegisterUserRepo) {}

  async perform (data: RegisterUserData): Promise<RegisterUserResponse> {
    const registerUserResult = User.register(data)
    if (registerUserResult.isLeft()) {
      return left(registerUserResult.value)
    }
    await this.registerUserRepo.execute(registerUserResult.value)
    return right()
  }
}

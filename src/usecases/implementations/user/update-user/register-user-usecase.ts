import type { RegisterUser, UpdateUserResponse } from '@/domain/contracts/user'
import { User, type RegisterUserData } from '@/domain/entities/user'
import { left, right } from '@/shared/either'

export class RegisterUserUseCase implements RegisterUser {
  async perform (data: RegisterUserData): Promise<UpdateUserResponse> {
    const registerUserResult = User.register(data)
    if (registerUserResult.isLeft()) {
      return left(registerUserResult.value)
    }

    return right()
  }
}

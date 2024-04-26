/* eslint-disable @typescript-eslint/return-await */
import type { RegisterUser, RegisterUserResponse } from '@/domain/contracts/user'
import { User, type RegisterUserData } from '@/domain/entities/user'
import { left, right } from '@/shared/either'
import { type RegisterUserRepo } from '@/usecases/contracts/db/user'
import { type SaveUserSocialMediaRepo } from '@/usecases/contracts/db/user-social-media'

export class RegisterUserUseCase implements RegisterUser {
  constructor (private readonly registerUserRepo: RegisterUserRepo,
    private readonly saveUserSocialMediaRepo: SaveUserSocialMediaRepo) { }

  async perform (data: RegisterUserData): Promise<RegisterUserResponse> {
    const registerUserResult = User.register(data)
    if (registerUserResult.isLeft()) {
      return left(registerUserResult.value)
    }
    await this.registerUserRepo.execute(registerUserResult.value)
    if (data.socialMedias) {
      const queries = data.socialMedias.map(async socialMedia => this.saveUserSocialMediaRepo.execute({
        userId: registerUserResult.value.id, socialMediaId: socialMedia.socialMediaId, link: socialMedia.userLink
      })
      )

      await Promise.all(queries)
    }
    return right()
  }
}

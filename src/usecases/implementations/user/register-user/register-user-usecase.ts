/* eslint-disable @typescript-eslint/return-await */
import type { RegisterUser, RegisterUserResponse } from '@/domain/contracts/user'
import { User, type RegisterUserData } from '@/domain/entities/user'
import { CityStateError } from '@/domain/errors'
import { left, right } from '@/shared/either'
import { type CityStateRepo } from '@/usecases/contracts/db/city-state-repo'
import { type RegisterUserRepo } from '@/usecases/contracts/db/user'
import { type SaveUserSocialMediaRepo } from '@/usecases/contracts/db/user-social-media'
import { type IBGEService } from '@/usecases/contracts/services/ibge/ibge-service'
import { Injectable } from '@nestjs/common'

@Injectable()
export class RegisterUserUseCase implements RegisterUser {
  constructor (
    private readonly registerUserRepo: RegisterUserRepo,
    private readonly saveUserSocialMediaRepo: SaveUserSocialMediaRepo,
    private readonly cityStateRepo: CityStateRepo,
    private readonly iBGEService: IBGEService
  ) { }

  async perform (data: RegisterUserData, session: any): Promise<RegisterUserResponse> {
    const registerUserResult = User.register(data)
    if (registerUserResult.isLeft()) {
      return left(registerUserResult.value)
    }

    const cityStateValue = data.cityState ?? null
    if (!session.getCityValidationDone && cityStateValue?.city && cityStateValue?.uf) {
      const { cityFounded } = await this.iBGEService.execute({ city: cityStateValue.city, uf: cityStateValue.uf })
      if (!cityFounded) return left(new CityStateError())
    }

    const cityState = cityStateValue && await this.cityStateRepo.execute(cityStateValue)

    await this.registerUserRepo.execute({ user: registerUserResult.value, cityStateId: cityState?.id })

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

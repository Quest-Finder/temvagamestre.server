import { AppException } from '@/shared/exceptions/app-exception'
import { UserPreferenceGamePlaceRepository } from '@/users/repository/user-preference-game-place/user-preference-game-place-repository'
import { UserPreferenceRepository } from '@/users/repository/user-preference/user-preference.repository'
import { Injectable } from '@nestjs/common'

export type SaveUserPreferenceGameServiceInput = {
  userId: string
  online: boolean
  inPerson: boolean
}

@Injectable()
export class UserPreferenceGamePlaceService {
  constructor (
    private readonly userPreferenceRepository: UserPreferenceRepository,
    private readonly userPreferenceGamePlaceRepository: UserPreferenceGamePlaceRepository
  ) {}

  async save ({ userId, online, inPerson }: SaveUserPreferenceGameServiceInput): Promise<void> {
    const userPreference = await this.userPreferenceRepository.findById(userId)
    if (!userPreference) {
      throw new AppException('User preference not found')
    }
    await this.userPreferenceGamePlaceRepository.save({
      id: userId, online, inPerson
    })
  }
}

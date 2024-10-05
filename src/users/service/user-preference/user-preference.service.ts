import { type ActiveType, type Frequency } from '@/users/repository/entity/user-preference.model'
import { UserPreferenceRepository } from '@/users/repository/user-preference/user-preference.repository'
import { Injectable } from '@nestjs/common'

export type UserPreferenceServiceInput = {
  userId: string
  frequency?: Frequency
  activeType: ActiveType
}

export type UserPreferenceServiceUpdateInput = UserPreferenceServiceInput

@Injectable()
export class UserPreferenceService {
  constructor (
    private readonly userPreferenceRepository: UserPreferenceRepository
  ) {}

  async save ({ userId, activeType, frequency }: UserPreferenceServiceInput): Promise<void> {
    const userPreference = await this.userPreferenceRepository.findById(userId)
    if (userPreference) {
      throw new Error('User preference already exits')
    }
    await this.userPreferenceRepository.save({
      activeType, frequency, id: userId
    })
  }

  async update ({ userId, activeType, frequency }: UserPreferenceServiceUpdateInput): Promise<void> {
    const userPreference = await this.userPreferenceRepository.findById(userId)
    if (!userPreference) {
      throw new Error('User preference not exits')
    }
    await this.userPreferenceRepository.update({
      id: userId,
      activeType,
      frequency
    })
  }
}

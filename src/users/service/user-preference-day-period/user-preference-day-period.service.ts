import { UserPreferenceRepository } from '@/users/repository/user-preference/user-preference.repository'
import { Injectable } from '@nestjs/common'
import { UserPreferenceDayPeriodRepository } from './../../repository/user-preference-day-period/user-preference-day-period-repository'

export type SaveUserPreferenceDayPeriodServiceInput = {
  userId: string
  morning: boolean
  afternoon: boolean
  night: boolean
}

@Injectable()
export class UserPreferenceDayPeriodService {
  constructor (
    private readonly userPreferenceRepository: UserPreferenceRepository,
    private readonly userPreferenceDayPeriodRepository: UserPreferenceDayPeriodRepository
  ) {}

  async save ({ userId, afternoon, morning, night }: SaveUserPreferenceDayPeriodServiceInput): Promise<void> {
    const userPreference = await this.userPreferenceRepository.findById(userId)
    if (!userPreference) {
      throw new Error('User preference not found')
    }
    await this.userPreferenceDayPeriodRepository.save({
      id: userId, afternoon, morning, night
    })
  }
}

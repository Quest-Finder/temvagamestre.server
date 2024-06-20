import type { SaveUserPreferenceDayPeriod, SaveUserPreferenceDayPeriodData, SaveUserPreferenceDayPeriodResponse } from '@/contracts/user-preference-day-period'
import { NonExistentUserPreferenceError } from '@/errors'
import { left, right } from '@/shared/either'
import type { FindUserPreferenceByIdRepo } from '@/usecases/contracts/db/user-preference'
import type { SaveUserPreferenceDayPeriodRepo } from '@/usecases/contracts/db/user-preference-day-period'

export class SaveUserPreferenceDayPeriodUsecase implements SaveUserPreferenceDayPeriod {
  constructor (
    private readonly findUserPreferenceByIdRepo: FindUserPreferenceByIdRepo,
    private readonly saveUserPreferenceDayPeriodRepo: SaveUserPreferenceDayPeriodRepo
  ) {}

  async perform (data: SaveUserPreferenceDayPeriodData): Promise<SaveUserPreferenceDayPeriodResponse> {
    const { userId: id, ...otherData } = data
    const userPreference = await this.findUserPreferenceByIdRepo.execute(id)
    if (!userPreference) {
      return left(new NonExistentUserPreferenceError(id))
    }
    await this.saveUserPreferenceDayPeriodRepo.execute({ id, ...otherData })
    return right()
  }
}

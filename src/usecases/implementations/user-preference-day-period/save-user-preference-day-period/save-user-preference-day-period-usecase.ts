import type { SaveUserPreferenceDayPeriod, SaveUserPreferenceDayPeriodData, SaveUserPreferenceDayPeriodResponse } from '@/domain/contracts/user-preference-day-period'
import { NonExistentUserPreferenceError } from '@/domain/errors'
import { left, right } from '@/shared/either'
import type { FindPreferenceByIdRepo } from '@/usecases/contracts/db/user'
import type { SaveUserPreferenceDayPeriodRepo } from '@/usecases/contracts/db/user-preference-day-period'

export class SaveUserPreferenceDayPeriodUsecase implements SaveUserPreferenceDayPeriod {
  constructor (
    private readonly findPreferenceByIdRepo: FindPreferenceByIdRepo,
    private readonly saveUserPreferenceDayPeriodRepo: SaveUserPreferenceDayPeriodRepo
  ) {}

  async perform (data: SaveUserPreferenceDayPeriodData): Promise<SaveUserPreferenceDayPeriodResponse> {
    const { userId: id, ...otherData } = data
    const userPreference = await this.findPreferenceByIdRepo.execute(id)
    if (!userPreference) {
      return left(new NonExistentUserPreferenceError(id))
    }
    await this.saveUserPreferenceDayPeriodRepo.execute({ id, ...otherData })
    return right(null)
  }
}

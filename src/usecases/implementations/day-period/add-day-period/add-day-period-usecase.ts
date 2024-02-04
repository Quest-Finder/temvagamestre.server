import type { AddDayPeriodData, AddDayPeriod, AddDayPeriodResponse } from '@/domain/contracts/user'
import { NonExistentUserPreferenceError } from '@/domain/errors'
import { left, right } from '@/shared/either'
import type { AddOrUpdateDayPeriodRepo, FindPreferenceByIdRepo } from '@/usecases/contracts/db/user'

export class AddDayPeriodUsecase implements AddDayPeriod {
  constructor (
    private readonly findPreferenceByIdRepo: FindPreferenceByIdRepo,
    private readonly addOrUpdateDayPeriodRepo: AddOrUpdateDayPeriodRepo
  ) {}

  async perform (data: AddDayPeriodData): Promise<AddDayPeriodResponse> {
    const { id } = data
    const userPreferenceExists = await this.findPreferenceByIdRepo.execute(id)
    if (!userPreferenceExists) {
      return left(new NonExistentUserPreferenceError(id))
    }
    await this.addOrUpdateDayPeriodRepo.execute(data)
    return right(null)
  }
}

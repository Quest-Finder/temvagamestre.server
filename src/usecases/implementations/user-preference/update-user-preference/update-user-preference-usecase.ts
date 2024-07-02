import type { UpdateUserPreference, UpdateUserPreferenceData, UpdateUserPreferenceResponse } from '@/contracts/user-preference'
import { NonExistentUserPreferenceError } from '@/errors'
import { left, right } from '@/shared/either'
import type { FindUserPreferenceByIdRepo, UpdateUserPreferenceRepo } from '@/usecases/contracts/db/user-preference'

export class UpdateUserPreferenceUseCase implements UpdateUserPreference {
  constructor (
    private readonly findUserPreferenceByIdRepo: FindUserPreferenceByIdRepo,
    private readonly updateUserPreferenceRepo: UpdateUserPreferenceRepo
  ) {}

  async perform (data: UpdateUserPreferenceData): Promise<UpdateUserPreferenceResponse> {
    const { userId: id, ...otherData } = data
    const userPreferenceExists = await this.findUserPreferenceByIdRepo.execute(id)
    if (!userPreferenceExists) {
      return left(new NonExistentUserPreferenceError(id))
    }
    await this.updateUserPreferenceRepo.execute({ id, ...otherData })
    return right()
  }
}

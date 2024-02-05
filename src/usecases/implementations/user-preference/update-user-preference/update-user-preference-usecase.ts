import type { UpdateUserPreferenceResponse, UpdateUserPreference, UpdateUserPreferenceData } from '@/domain/contracts/user'
import { NonExistentUserPreferenceError } from '@/domain/errors'
import { left, right } from '@/shared/either'
import { type UpdateUserPreferenceRepo } from '@/usecases/contracts/db/user'
import { type FindUserPreferenceByIdRepo } from '@/usecases/contracts/db/user-preference'

export class UpdateUserPreferenceUseCase implements UpdateUserPreference {
  constructor (
    private readonly findUserPreferenceByIdRepo: FindUserPreferenceByIdRepo,
    private readonly updateUserPreferenceRepo: UpdateUserPreferenceRepo
  ) {}

  async perform (data: UpdateUserPreferenceData): Promise<UpdateUserPreferenceResponse> {
    const { id } = data
    const userPreferenceExists = await this.findUserPreferenceByIdRepo.execute(id)
    if (!userPreferenceExists) {
      return left(new NonExistentUserPreferenceError(id))
    }
    await this.updateUserPreferenceRepo.execute(data)
    return right(null)
  }
}

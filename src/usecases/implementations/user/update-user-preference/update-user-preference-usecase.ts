import { type UpdateUserPreferenceResponse, type UpdateUserPreference, type UpdateUserPreferenceData } from '@/domain/contracts/user'
import { NonExistentUserPreferencesError } from '@/domain/errors'
import { left, right } from '@/shared/either'
import { type UpdateUserPreferenceRepo, type FindPreferenceByIdRepo } from '@/usecases/contracts/db/user'

export class UpdateUserPreferenceUseCase implements UpdateUserPreference {
  constructor (
    private readonly findPreferenceByIdRepo: FindPreferenceByIdRepo,
    private readonly updateUserPreferenceRepo: UpdateUserPreferenceRepo
  ) {}

  async perform (data: UpdateUserPreferenceData): Promise<UpdateUserPreferenceResponse> {
    const { id } = data
    const userPreferenceExists = await this.findPreferenceByIdRepo.execute(id)

    if (!userPreferenceExists) {
      return left(new NonExistentUserPreferencesError(id))
    }

    await this.updateUserPreferenceRepo.execute(data)

    return right(null)
  }
}

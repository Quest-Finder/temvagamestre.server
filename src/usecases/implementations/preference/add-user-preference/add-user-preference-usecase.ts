import type { AddUserPreference, AddUserPreferenceData, AddUserPreferenceResponse } from '@/domain/contracts/user/add-user-preference'
import { ExistentUserPreferenceError } from '@/domain/errors'
import { left, right } from '@/shared/either'
import type { AddUserPreferenceRepo, FindPreferenceByIdRepo } from '@/usecases/contracts/db/user'

export class AddUserPreferenceUsecase implements AddUserPreference {
  constructor (
    private readonly findPreferenceByIdRepo: FindPreferenceByIdRepo,
    private readonly addUserPreferenceRepo: AddUserPreferenceRepo
  ) {}

  async perform (data: AddUserPreferenceData): Promise<AddUserPreferenceResponse> {
    const { id } = data
    const userPreferenceExists = await this.findPreferenceByIdRepo.execute(id)
    if (userPreferenceExists) {
      return left(new ExistentUserPreferenceError(id))
    }
    await this.addUserPreferenceRepo.execute(data)
    return right(null)
  }
}

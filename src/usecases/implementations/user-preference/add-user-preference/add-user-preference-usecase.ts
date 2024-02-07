import type { AddUserPreference, AddUserPreferenceData, AddUserPreferenceResponse } from '@/domain/contracts/user-preference'
import { ExistentUserPreferenceError } from '@/domain/errors'
import { left, right } from '@/shared/either'
import type { AddUserPreferenceRepo, FindUserPreferenceByIdRepo } from '@/usecases/contracts/db/user-preference'

export class AddUserPreferenceUsecase implements AddUserPreference {
  constructor (
    private readonly findUserPreferenceByIdRepo: FindUserPreferenceByIdRepo,
    private readonly addUserPreferenceRepo: AddUserPreferenceRepo
  ) {}

  async perform (data: AddUserPreferenceData): Promise<AddUserPreferenceResponse> {
    const { userId: id, ...otherData } = data
    const userPreferenceExists = await this.findUserPreferenceByIdRepo.execute(id)
    if (userPreferenceExists) {
      return left(new ExistentUserPreferenceError(id))
    }
    await this.addUserPreferenceRepo.execute({ id, ...otherData })
    return right(null)
  }
}

import type { SaveUserPreferenceGamePlace, SaveUserPreferenceGamePlaceData, SaveUserPreferenceGamePlaceResponse } from '@/domain/contracts/user-preference-game-place'
import { NonExistentUserPreferenceError } from '@/domain/errors'
import { left, right } from '@/shared/either'
import { type FindPreferenceByIdRepo } from '@/usecases/contracts/db/user'
import { type SaveUserPreferenceGamePlaceRepo } from '@/usecases/contracts/db/user-preference-game-place'

export class SaveUserPreferenceGamePlaceUsecase implements SaveUserPreferenceGamePlace {
  constructor (
    private readonly findPreferenceByIdRepo: FindPreferenceByIdRepo,
    private readonly saveUserPreferenceGamePlaceRepo: SaveUserPreferenceGamePlaceRepo
  ) {}

  async perform (data: SaveUserPreferenceGamePlaceData): Promise<SaveUserPreferenceGamePlaceResponse> {
    const { userId: id, ...otherData } = data
    const userPreferenceExists = await this.findPreferenceByIdRepo.execute(id)
    if (!userPreferenceExists) {
      return left(new NonExistentUserPreferenceError(id))
    }
    await this.saveUserPreferenceGamePlaceRepo.execute({ id, ...otherData })
    return right(null)
  }
}

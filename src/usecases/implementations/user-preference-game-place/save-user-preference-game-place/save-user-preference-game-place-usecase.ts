import type { SaveUserPreferenceGamePlace, SaveUserPreferenceGamePlaceData, SaveUserPreferenceGamePlaceResponse } from '@/contracts/user-preference-game-place'
import { NonExistentUserPreferenceError } from '@/errors'
import { left, right } from '@/shared/either'
import { type FindUserPreferenceByIdRepo } from '@/usecases/contracts/db/user-preference'
import { type SaveUserPreferenceGamePlaceRepo } from '@/usecases/contracts/db/user-preference-game-place'

export class SaveUserPreferenceGamePlaceUsecase implements SaveUserPreferenceGamePlace {
  constructor (
    private readonly findUserPreferenceByIdRepo: FindUserPreferenceByIdRepo,
    private readonly saveUserPreferenceGamePlaceRepo: SaveUserPreferenceGamePlaceRepo
  ) {}

  async perform (data: SaveUserPreferenceGamePlaceData): Promise<SaveUserPreferenceGamePlaceResponse> {
    const { userId: id, ...otherData } = data
    const userPreferenceExists = await this.findUserPreferenceByIdRepo.execute(id)
    if (!userPreferenceExists) {
      return left(new NonExistentUserPreferenceError(id))
    }
    await this.saveUserPreferenceGamePlaceRepo.execute({ id, ...otherData })
    return right()
  }
}

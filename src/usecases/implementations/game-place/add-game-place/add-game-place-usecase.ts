import { type AddGamePlace, type AddGamePlaceData, type AddGamePlaceResponse } from '@/domain/contracts/user'
import { NonExistentUserPreferenceError } from '@/domain/errors'
import { left, right } from '@/shared/either'
import { type FindPreferenceByIdRepo } from '@/usecases/contracts/db/user'
import { type AddOrUpdateGamePlaceRepo } from '@/usecases/contracts/db/user/add-or-update-game-place-repo'

export class AddGamePlaceUsecase implements AddGamePlace {
  constructor (
    private readonly findPreferenceByIdRepo: FindPreferenceByIdRepo,
    private readonly addOrUpdateGamePlaceRepo: AddOrUpdateGamePlaceRepo
  ) {}

  async perform (data: AddGamePlaceData): Promise<AddGamePlaceResponse> {
    const { id } = data
    const userPreferenceExists = await this.findPreferenceByIdRepo.execute(id)
    if (!userPreferenceExists) {
      return left(new NonExistentUserPreferenceError(id))
    }
    await this.addOrUpdateGamePlaceRepo.execute(data)
    return right(null)
  }
}

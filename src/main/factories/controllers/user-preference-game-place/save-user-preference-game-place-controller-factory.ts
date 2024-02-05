import { SaveUserPreferenceGamePlaceZodValidation } from '@/validators/zod/user-preferece-game-place/save-user-preference-game-place-zod-validation'
import { makeSaveUserPreferenceGamePlaceUsecase } from '../../usecases/user-preference-game-place/save-user-preference-game-place-usecase-factory'
import { type Controller } from '@/presentation/contracts'
import { SaveUserPreferenceGamePlaceController } from '@/presentation/controllers/user-preference-game-place/save-user-preference-game-place/save-user-preference-game-place-controller'

export const makeSaveUserPreferenceGamePlaceController = (): Controller => {
  const validation = new SaveUserPreferenceGamePlaceZodValidation()
  return new SaveUserPreferenceGamePlaceController(
    validation, makeSaveUserPreferenceGamePlaceUsecase()
  )
}

import { SaveUserPreferenceGamePlaceZodValidation } from '@/validators/zod/user-preference-game-place/save-user-preference-game-place-zod-validation'
import { makeSaveUserPreferenceGamePlaceUsecase } from '../../usecases/user-preference-game-place/save-user-preference-game-place-usecase-factory'
import { type Controller } from '@/presentation/contracts'
import { SaveUserPreferenceGamePlaceController } from '@/presentation/controllers/user-preference-game-place/save-user-preference-game-place/save-user-preference-game-place-controller'
import { makeLogControllerDecorator } from '../../decorators'

export const makeSaveUserPreferenceGamePlaceController = (): Controller => {
  const validation = new SaveUserPreferenceGamePlaceZodValidation()
  const controller = new SaveUserPreferenceGamePlaceController(
    validation, makeSaveUserPreferenceGamePlaceUsecase()
  )
  return makeLogControllerDecorator(controller)
}

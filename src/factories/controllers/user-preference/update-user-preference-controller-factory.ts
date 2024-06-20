import { type Controller } from '@/contracts'
import { UpdateUserPreferenceController } from '@/controllers/user-preference/update-user-preference/update-user-preference-controller'
import { UpdateUserPreferenceZodValidation } from '@/validators/user-preference/update-user-preference/update-user-preference-zod-validation'
import { makeUpdateUserPreferenceUsecase } from '../../usecases/user-preference/update-user-preference-usecase-factory'
import { makeLogControllerDecorator } from '../../decorators'

export const makeUpdateUserPreferenceController = (): Controller => {
  const validation = new UpdateUserPreferenceZodValidation()
  const controller = new UpdateUserPreferenceController(
    validation, makeUpdateUserPreferenceUsecase()
  )
  return makeLogControllerDecorator(controller)
}

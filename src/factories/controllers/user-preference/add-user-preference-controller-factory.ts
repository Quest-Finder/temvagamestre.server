import { type Controller } from '@/contracts'
import { AddUserPreferenceController } from '@/controllers/user-preference/add-user-preference/add-user-preference-controller'
import { AddUserPreferenceZodValidation } from '@/validators/user-preference/add-user-preference-zod-validation'
import { makeAddUserPreferenceUseCase } from '../../usecases/user-preference/add-user-preference-usecase-factory'
import { makeLogControllerDecorator } from '../../decorators'

export const makeAddUserPreferenceController = (): Controller => {
  const validation = new AddUserPreferenceZodValidation()
  const controller = new AddUserPreferenceController(
    validation, makeAddUserPreferenceUseCase()
  )
  return makeLogControllerDecorator(controller)
}

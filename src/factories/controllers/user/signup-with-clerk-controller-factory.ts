import { makeAddUserUseCase } from '@/factories/usecases/user/add-user-usecase-factory'
import { SignUpWithClerkController } from '@/controllers/user/signup/signup-with-clerk-controller'
import { SignUpZodValidation } from '@/validators/user/signup/signup-zod-validation'
import { type Controller } from '@/contracts/controller'
import { makeLogControllerDecorator } from '../../decorators'

export const makeSignUpWithClerkController = (): Controller => {
  const validation = new SignUpZodValidation()
  const controller = new SignUpWithClerkController(validation, makeAddUserUseCase())
  return makeLogControllerDecorator(controller)
}

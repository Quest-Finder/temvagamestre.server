import { makeAddUserUseCase } from '@/factories/usecases/user/add-user-usecase-factory'
import { SignUpController } from '@/controllers/user/signup/signup-controller'
import { SignUpZodValidation } from '@/validators/user/signup/signup-zod-validation'
import { type Controller } from '@/contracts/controller'
import { makeLogControllerDecorator } from '../../decorators'

export const makeSignUpController = (): Controller => {
  const validation = new SignUpZodValidation()
  const controller = new SignUpController(validation, makeAddUserUseCase())
  return makeLogControllerDecorator(controller)
}

import { makeAddUserUseCase } from '@/main/factories/usecases/user/add-user-usecase-factory'
import { SignUpController } from '@/presentation/controllers/user/signup/signup-controller'
import { SignUpZodValidation } from '@/validators/zod/user/signup/signup-zod-validation'
import { type Controller } from '@/presentation/contracts/controller'
import { makeLogControllerDecorator } from '../../decorators'

export const makeSignUpController = (): Controller => {
  const validation = new SignUpZodValidation()
  const controller = new SignUpController(validation, makeAddUserUseCase())
  return makeLogControllerDecorator(controller)
}

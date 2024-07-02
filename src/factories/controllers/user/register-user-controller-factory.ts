import { type Controller } from '@/contracts/controller'
import { RegisterUserController } from '@/controllers/user/register-user/register-user-controller'
import { RegisterUserZodValidation } from '@/validators/user/register/register-user-zod-validation'
import { makeLogControllerDecorator } from '../../decorators'
import { makeRegisterUserUseCase } from '../../usecases/user/register-user-usecase-factory'

export const makeRegisterUserController = (): Controller => {
  const validation = new RegisterUserZodValidation()
  const controller = new RegisterUserController(validation, makeRegisterUserUseCase())
  return makeLogControllerDecorator(controller)
}

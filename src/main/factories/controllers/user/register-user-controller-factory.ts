import { type Controller } from '@/presentation/contracts/controller'
import { RegisterUserController } from '@/presentation/controllers/user/register-user/register-user-controller'
import { RegisterUserZodValidation } from '@/validators/zod/user/register/register-user-zod-validation'
import { makeLogControllerDecorator } from '../../decorators'
import { makeRegisterUserUseCase } from '../../usecases/user/register-user-usecase-factory'

export const makeRegisterUserController = (): Controller => {
  const validation = new RegisterUserZodValidation()
  const controller = new RegisterUserController(validation, makeRegisterUserUseCase())
  return makeLogControllerDecorator(controller)
}

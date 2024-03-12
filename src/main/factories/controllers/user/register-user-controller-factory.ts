import { type Controller } from '@/presentation/contracts/controller'
import { RegisterUserController } from '@/presentation/controllers/user/register-user/register-user-controller'
import { RegisterUserZodValidation } from '@/validators/zod/user/register/register-user-zod-validation'
import { makeRegisterUserUseCase } from '../../usecases/user/register-user-usecase-factory'
import { makeLogControllerDecorator } from '../../decorators'

export const makeRegisterUserController = (): Controller => {
  const validation = new RegisterUserZodValidation()
  const controller = new RegisterUserController(validation, makeRegisterUserUseCase())
  return makeLogControllerDecorator(controller)
}

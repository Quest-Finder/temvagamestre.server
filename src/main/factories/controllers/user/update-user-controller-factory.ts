import { type Controller } from '@/presentation/contracts/controller'
import { UpdateUserController } from '@/presentation/controllers/user/register-user/register-user-controller'
import { UpdateUserZodValidation } from '@/validators/zod/user/update-user/update-user-zod-validation'
import { makeUpdateUserUseCase } from '../../usecases/user/update-user-usecase-factory'
import { makeLogControllerDecorator } from '../../decorators'

export const makeUpdateUserController = (): Controller => {
  const validation = new UpdateUserZodValidation()
  const controller = new UpdateUserController(validation, makeUpdateUserUseCase())
  return makeLogControllerDecorator(controller)
}

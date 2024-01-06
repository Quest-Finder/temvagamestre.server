import { type Controller } from '@/presentation/contracts/controller'
import { UpdateUserController } from '@/presentation/controllers/user/update-user/update-user-controller'
import { UpdateUserZodValidation } from '@/validators/user/update-user/update-user-zod-validation'
import { makeUpdateUserUseCase } from '../../usecases/user/update-user-usecase-factory'

export const makeUpdateUserController = (): Controller => {
  const validation = new UpdateUserZodValidation()
  return new UpdateUserController(validation, makeUpdateUserUseCase())
}

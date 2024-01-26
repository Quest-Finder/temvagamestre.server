import { type Controller } from '@/presentation/contracts'
import { UpdateUserConfigsController } from '@/presentation/controllers/user/update-user-configs/update-user-configs-controller'
import { UpdateUserConfigsZodValidation } from '@/validators/user/update-user-configs-zod-validation'
import { makeUpdateUserConfigsUseCase } from '../../usecases/user/update-user-configs-usecase-factory'

export const makeUpdateUserConfigsController = (): Controller => {
  const validation = new UpdateUserConfigsZodValidation()
  return new UpdateUserConfigsController(
    validation, makeUpdateUserConfigsUseCase()
  )
}

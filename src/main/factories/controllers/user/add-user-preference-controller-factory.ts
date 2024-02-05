import { type Controller } from '@/presentation/contracts'
import { AddUserPreferenceController } from '@/presentation/controllers/user/add-user-preference/add-user-preference-controller'
import { AddUserPreferenceZodValidation } from '@/validators/zod/user/add-user-preference/add-user-preference-zod-validation'
import { makeAddUserPreferenceUseCase } from '../../usecases/user/add-user-preference-usecase-factory'

export const makeAddUserPreferenceController = (): Controller => {
  const validation = new AddUserPreferenceZodValidation()

  return new AddUserPreferenceController(
    validation,
    makeAddUserPreferenceUseCase()
  )
}

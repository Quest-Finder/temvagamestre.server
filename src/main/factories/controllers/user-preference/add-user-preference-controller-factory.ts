import { type Controller } from '@/presentation/contracts'
import { AddUserPreferenceController } from '@/presentation/controllers/user-preference/add-user-preference/add-user-preference-controller'
import { AddUserPreferenceZodValidation } from '@/validators/zod/user-preference/add-user-preference-zod-validation'
import { makeAddUserPreferenceUseCase } from '../../usecases/user-preference/add-user-preference-usecase-factory'

export const makeAddUserPreferenceController = (): Controller => {
  const validation = new AddUserPreferenceZodValidation()
  return new AddUserPreferenceController(
    validation, makeAddUserPreferenceUseCase()
  )
}

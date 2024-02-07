import { type Controller } from '@/presentation/contracts'
import { UpdateUserPreferenceController } from '@/presentation/controllers/user-preference/update-user-preference/update-user-preference-controller'
import { UpdateUserPreferenceZodValidation } from '@/validators/zod/user-preference/update-user-preference/update-user-preference-zod-validation'
import { makeUpdateUserPreferenceUsecase } from '../../usecases/user-preference/update-user-preference-usecase-factory'

export const makeUpdateUserPreferenceController = (): Controller => {
  const validation = new UpdateUserPreferenceZodValidation()
  return new UpdateUserPreferenceController(
    validation, makeUpdateUserPreferenceUsecase()
  )
}

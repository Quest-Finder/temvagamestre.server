import { type Controller } from '@/presentation/contracts'
import { UpdateUserSocialMediaController } from '@/presentation/controllers/user/update-user-social-media/update-user-social-media-controller'
import { makeUpdateUserSocialMediaUseCaseFactory } from '@/main/factories/usecases/user/update-user-social-media-usecase-factory'
import { UpdateUserSocialMediaValidation } from '@/validators/user/update-user-social-media-zod-validation'

export const makeUpdateUserSocialMediaFactory = (): Controller => {
  const validation = new UpdateUserSocialMediaValidation()
  return new UpdateUserSocialMediaController(
    validation,
    makeUpdateUserSocialMediaUseCaseFactory()
  )
}

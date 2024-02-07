import { type Controller } from '@/presentation/contracts'
import { SaveUserSocialMediaValidation } from '@/validators/zod/user-social-medial/save-user-social-media-zod-validation'
import { makeSaveUserSocialMediaUseCase } from '../../usecases/user-social-media/save-user-social-media-usecase-factory'
import { SaveUserSocialMediaController } from '@/presentation/controllers/user-social-media/save-user-social-media/save-user-social-media-controller'

export const makeSaveUserSocialMediaController = (): Controller => {
  const validation = new SaveUserSocialMediaValidation()
  return new SaveUserSocialMediaController(
    validation, makeSaveUserSocialMediaUseCase()
  )
}

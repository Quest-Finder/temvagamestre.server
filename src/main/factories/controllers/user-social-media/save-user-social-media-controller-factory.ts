import { type Controller } from '@/presentation/contracts'
import { SaveUserSocialMediaValidation } from '@/validators/zod/user-social-medial/save-user-social-media-zod-validation'
import { makeSaveUserSocialMediaUseCase } from '../../usecases/user-social-media/save-user-social-media-usecase-factory'
import { SaveUserSocialMediaController } from '@/presentation/controllers/user-social-media/save-user-social-media/save-user-social-media-controller'
import { makeLogControllerDecorator } from '../../decorators'

export const makeSaveUserSocialMediaController = (): Controller => {
  const validation = new SaveUserSocialMediaValidation()
  const controller = new SaveUserSocialMediaController(
    validation, makeSaveUserSocialMediaUseCase()
  )
  return makeLogControllerDecorator(controller)
}

import { makeLogControllerDecorator } from '@/factories/decorators'
import { makeFindManySocialMediaUsecase } from '@/factories/usecases/social-media/find-many-social-medias-usecase-factory'
import { type Controller } from '@/contracts'
import { FindManySocialMediasController } from '@/controllers/social-media/find-many-social-medias/find-many-social-medias-controller'

export const makeFindManySocialMediasController = (): Controller => {
  const controller = new FindManySocialMediasController(
    makeFindManySocialMediaUsecase()
  )
  return makeLogControllerDecorator(controller)
}

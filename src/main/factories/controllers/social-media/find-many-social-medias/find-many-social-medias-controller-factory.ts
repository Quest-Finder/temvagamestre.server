import { makeLogControllerDecorator } from '@/main/factories/decorators'
import { makeFindManySocialMediaUsecase } from '@/main/factories/usecases/social-media/find-many-social-medias-usecase-factory'
import { type Controller } from '@/presentation/contracts'
import { FindManySocialMediasController } from '@/presentation/controllers/social-media/find-many-social-medias/find-many-social-medias-controller'

export const makeFindManySocialMediasController = (): Controller => {
  const controller = new FindManySocialMediasController(
    makeFindManySocialMediaUsecase()
  )
  return makeLogControllerDecorator(controller)
}

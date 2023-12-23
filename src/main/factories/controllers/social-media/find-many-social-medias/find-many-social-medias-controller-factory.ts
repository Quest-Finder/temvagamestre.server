import { makeFindManySocialMediaUsecase } from '@/main/factories/usecases/social-media/find-many-social-medias-usecase-factory'
import { FindManySocialMediasController } from '@/presentation/controllers/social-media/find-many-social-medias/find-many-social-medias-controller'

export const makeFindManySocialMediasController = (): FindManySocialMediasController => {
  return new FindManySocialMediasController(
    makeFindManySocialMediaUsecase()
  )
}

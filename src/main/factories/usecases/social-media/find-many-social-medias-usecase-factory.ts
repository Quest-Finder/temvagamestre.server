import { FindManySocialMediasUsecase } from '@/usecases/implementations/social-media/find-many-social-medias/find-many-social-medias-usecase'
import { makeFindManySocialMediasPrismaRepo } from '../../infra/db/prisma/social-media/find-many-social-medias-prisma-repo-factory'

export const makeFindManySocialMediaUsecase = (): FindManySocialMediasUsecase => {
  return new FindManySocialMediasUsecase(
    makeFindManySocialMediasPrismaRepo()
  )
}

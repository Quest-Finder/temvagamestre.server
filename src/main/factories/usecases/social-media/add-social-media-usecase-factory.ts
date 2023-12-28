import { type AddSocialMedia } from '@/domain/contracts/social-media'
import { AddSocialMediaUseCase } from '@/usecases/implementations/social-media/add-social-media/add-social-media-usecase'
import { makeAddSocialMediaPrismaRepo } from '../../infra/db/prisma/social-media/add-social-media-prisma-repo-factory'
import { makeFindSocialMediaByNamePrismaRepo } from '../../infra/db/prisma/social-media/find-social-media-by-name-prisma-repo-factory'
import { makeUuidAdapter } from '../../infra/id/uuid-adapter-factory'

export const makeAddSocialMediaUsecase = (): AddSocialMedia => {
  return new AddSocialMediaUseCase(
    makeAddSocialMediaPrismaRepo(),
    makeFindSocialMediaByNamePrismaRepo(),
    makeUuidAdapter()
  )
}

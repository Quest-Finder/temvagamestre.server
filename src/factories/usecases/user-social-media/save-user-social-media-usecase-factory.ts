import { type SaveUserSocialMedia } from '@/contracts/user-social-media'
import { makeFindSocialMediaByIdRepo } from '../../infra/db/prisma/social-media/find-social-media-by-id-repo-factory'
import { SaveUserSocialMediaUseCase } from '@/usecases/implementations/user-social-media/save-user-social-media/save-user-social-media-usecase'
import { makeSaveUserSocialMediaPrismaRepo } from '../../infra/db/prisma/user-social-media/save-user-social-media-prisma-repo-factory'

export const makeSaveUserSocialMediaUseCase = (): SaveUserSocialMedia => {
  return new SaveUserSocialMediaUseCase(
    makeFindSocialMediaByIdRepo(),
    makeSaveUserSocialMediaPrismaRepo()
  )
}

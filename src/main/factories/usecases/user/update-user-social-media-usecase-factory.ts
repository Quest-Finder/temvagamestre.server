import { type UpdateUserSocialMedia } from '@/domain/contracts/user'
import { makeFindSocialMediaByIdRepo } from '../../infra/db/prisma/user/find-social-media-by-id-repo-factory'
import { makeAddOrUpdateUserSocialMediaByIdsRepoFactory } from '../../infra/db/prisma/user/add-or-update-user-social-media-by-ids-repo-factory'
import { UpdateUserSocialMediaUseCase } from '@/usecases/implementations/user/update-user-social-media/update-user-social-media-usecase'

export const makeUpdateUserSocialMediaUseCaseFactory = (): UpdateUserSocialMedia => {
  return new UpdateUserSocialMediaUseCase(
    makeFindSocialMediaByIdRepo(),
    makeAddOrUpdateUserSocialMediaByIdsRepoFactory()
  )
}

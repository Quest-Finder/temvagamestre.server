import { AddOrUpdateUserSocialMediaByIdsPrismaRepo } from '@/infra/db/prisma/data/user-social-media/add-or-update-user-social-media-by-ids/add-or-update-user-social-media-by-ids-prisma-repo'
import { type AddOrUpdateUserSocialMediaByIdsRepo } from '@/usecases/contracts/db/user/add-or-update-user-social-media-by-ids-repo'

export const makeAddOrUpdateUserSocialMediaByIdsRepo = (): AddOrUpdateUserSocialMediaByIdsRepo => {
  return new AddOrUpdateUserSocialMediaByIdsPrismaRepo()
}

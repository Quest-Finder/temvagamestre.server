import { SaveUserSocialMediaPrismaRepo } from '@/infra/db/prisma/data/user-social-media/save-user-social-media/save-user-social-media-prisma-repo'
import { type SaveUserSocialMediaRepo } from '@/usecases/contracts/db/user-social-media'

export const makeSaveUserSocialMediaPrismaRepo = (): SaveUserSocialMediaRepo => {
  return new SaveUserSocialMediaPrismaRepo()
}

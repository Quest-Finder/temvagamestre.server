import { AddSocialMediaPrismaRepo } from '@/infra/db/prisma/social-media/add-social-media/add-social-media-prisma-repo'
import { type AddSocialMediaRepo } from '@/usecases/contracts/db/social-media'

export const makeAddSocialMediaPrismaRepo = (): AddSocialMediaRepo => {
  return new AddSocialMediaPrismaRepo()
}

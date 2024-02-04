import { FindSocialMediaByNamePrismaRepo } from '@/infra/db/prisma/data/social-media/find-social-media-by-name/find-social-media-by-name-prisma-repo'
import { type FindSocialMediaByNameRepo } from '@/usecases/contracts/db/social-media/find-social-media-by-name-repo'

export const makeFindSocialMediaByNamePrismaRepo = (): FindSocialMediaByNameRepo => {
  return new FindSocialMediaByNamePrismaRepo()
}

import { FindSocialMediaByIdPrismaRepo } from '@/infra/db/prisma/data/social-media/find-social-media-by-id/find-social-media-by-id-prisma-repo'
import { type FindSocialMediaByIdRepo } from '@/usecases/contracts/db/social-media/find-social-media-by-id-repo'

export const makeFindSocialMediaByIdRepo = (): FindSocialMediaByIdRepo => {
  return new FindSocialMediaByIdPrismaRepo()
}

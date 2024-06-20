import { FindManySocialMediasPrismaRepo } from '@/infra/database/prisma/data/social-media/find-many-social-medias/find-many-social-medias-prisma-repo'

export const makeFindManySocialMediasPrismaRepo = (): FindManySocialMediasPrismaRepo => {
  return new FindManySocialMediasPrismaRepo()
}

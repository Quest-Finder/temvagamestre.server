import { FindManySocialMediasPrismaRepo } from '@/infra/db/prisma/social-media/find-many-social-medias/find-many-social-medias-prisma-repo'

export const makeFindManySocialMediasPrismaRepo = (): FindManySocialMediasPrismaRepo => {
  return new FindManySocialMediasPrismaRepo()
}

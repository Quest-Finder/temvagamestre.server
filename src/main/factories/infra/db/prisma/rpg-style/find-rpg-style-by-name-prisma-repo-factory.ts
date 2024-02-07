import { FindRpgStyleByNamePrismaRepo } from '@/infra/db/prisma/data/rpg-style/find-rpg-style-by-name/find-rpg-style-by-name-prisma-repo'

export const makeFindRpgStyleByNamePrismaRepo = (): FindRpgStyleByNamePrismaRepo => {
  return new FindRpgStyleByNamePrismaRepo()
}

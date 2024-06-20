import { AddRpgStylePrismaRepo } from '@/infra/database/prisma/data/rpg-style/add-rpg-style/add-rpg-style-prisma-repo'

export const makeAddRpgStylePrismaRepo = (): AddRpgStylePrismaRepo => {
  return new AddRpgStylePrismaRepo()
}

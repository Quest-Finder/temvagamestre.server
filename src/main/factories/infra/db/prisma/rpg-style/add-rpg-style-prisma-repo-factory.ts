import { AddRpgStylePrismaRepo } from '@/infra/db/prisma/rpg-style/add-rpg-style/add-rpg-style-prisma-repo'

export const makeAddRpgStylePrismaRepo = (): AddRpgStylePrismaRepo => {
  return new AddRpgStylePrismaRepo()
}

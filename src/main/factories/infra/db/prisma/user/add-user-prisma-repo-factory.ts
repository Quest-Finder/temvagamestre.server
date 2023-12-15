import { AddUserPrismaRepo } from '@/infra/db/prisma/user/add-user/add-user-prisma-repo'
import { type AddUserRepo } from '@/usecases/contracts/db/user'

export const makeAddUserPrismaRepo = (): AddUserRepo => {
  return new AddUserPrismaRepo()
}

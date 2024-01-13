import { UpdateUserPrismaRepo } from '@/infra/db/prisma/user/update-user/update-user-prisma-repo'
import { type UpdateUserRepo } from '@/usecases/contracts/db/user'

export const makeUpdateUserPrismaRepo = (): UpdateUserRepo => {
  return new UpdateUserPrismaRepo()
}

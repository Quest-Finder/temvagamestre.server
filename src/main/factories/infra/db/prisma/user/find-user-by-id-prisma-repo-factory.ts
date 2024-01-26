import { FindUserByIdPrismaRepo } from '@/infra/db/prisma/user/find-user-by-id/find-user-by-id-prisma-repo'
import { type FindUserByIdRepo } from '@/usecases/contracts/db/user'

export const makeFindUserByIdPrismaRepo = (): FindUserByIdRepo => {
  return new FindUserByIdPrismaRepo()
}

import { type CheckUserById } from '@/contracts/user/check-by-id'
import { FindUserByIdPrismaRepo } from '@/infra/database/prisma/data/user/find-user-by-id/find-user-by-id-prisma-repo'
import { CheckUserByIdUseCase } from '@/usecases/implementations/user/check-user-by-id/check-user-by-id-user-case'

export const makeCheckUserByIdUseCase = (): CheckUserById => {
  const repository = new FindUserByIdPrismaRepo()
  return new CheckUserByIdUseCase(repository)
}

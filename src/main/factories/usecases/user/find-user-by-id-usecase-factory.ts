import { type FindUserById } from '@/domain/contracts/user'
import { FindUserByIdPrismaRepo } from '@/infra/db/prisma/data/user/find-user-by-id/find-user-by-id-prisma-repo'
import { FindUserByIdUseCase } from '@/usecases/implementations/user/find-user-by-id/find-user-by-id-usecase'

export const makeFindUserByIdUseCase = (): FindUserById => {
  const findUserByIdRepository = new FindUserByIdPrismaRepo()
  return new FindUserByIdUseCase(findUserByIdRepository)
}

import { type UpdateUser } from '@/domain/contracts/user'
import { UpdateUserUseCase } from '@/usecases/implementations/user/update-user/register-user-usecase'
import { makeUpdateUserPrismaRepo } from '../../infra/db/prisma/user/update-user-prisma-repo-factory'

export const makeUpdateUserUseCase = (): UpdateUser => {
  return new UpdateUserUseCase(makeUpdateUserPrismaRepo())
}

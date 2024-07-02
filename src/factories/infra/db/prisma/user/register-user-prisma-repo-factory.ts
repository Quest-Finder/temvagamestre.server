import { RegisterUserPrismaRepo } from '@/infra/database/prisma/data/user/register-user/register-user-prisma-repo'
import { type RegisterUserRepo } from '@/usecases/contracts/db/user'

export const makeRegisterUserPrismaRepo = (): RegisterUserRepo => {
  return new RegisterUserPrismaRepo()
}

import { type RegisterUser } from '@/domain/contracts/user'
import { makeRegisterUserPrismaRepo } from '../../infra/db/prisma/user/register-user-prisma-repo-factory'
import { RegisterUserUseCase } from '@/usecases/implementations/user/register-user/register-user-usecase'

export const makeRegisterUserUseCase = (): RegisterUser => {
  return new RegisterUserUseCase(makeRegisterUserPrismaRepo())
}

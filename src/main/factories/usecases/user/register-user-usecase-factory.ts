import { type RegisterUser } from '@/domain/contracts/user'
import { RegisterUserUseCase } from '@/usecases/implementations/user/register-user/register-user-usecase'
import { makeSaveUserSocialMediaPrismaRepo } from '../../infra/db/prisma/user-social-media/save-user-social-media-prisma-repo-factory'
import { makeRegisterUserPrismaRepo } from '../../infra/db/prisma/user/register-user-prisma-repo-factory'

export const makeRegisterUserUseCase = (): RegisterUser => {
  return new RegisterUserUseCase(makeRegisterUserPrismaRepo(), makeSaveUserSocialMediaPrismaRepo())
}

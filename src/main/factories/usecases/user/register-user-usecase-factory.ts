import { type RegisterUser } from '@/domain/contracts/user'
import { RegisterUserUseCase } from '@/usecases/implementations/user/register-user/register-user-usecase'
import { makeCityStateRepo } from '../../infra/db/prisma/city-state/make-city-state-prisma-repo'
import { makeSaveUserSocialMediaPrismaRepo } from '../../infra/db/prisma/user-social-media/save-user-social-media-prisma-repo-factory'
import { makeRegisterUserPrismaRepo } from '../../infra/db/prisma/user/register-user-prisma-repo-factory'
import { makeIbgeService } from '../../service/ibge/make-ibge-service-factory'

export const makeRegisterUserUseCase = (): RegisterUser => {
  const registerUserRepo = makeRegisterUserPrismaRepo()
  const saveUserSocialMediaRepo = makeSaveUserSocialMediaPrismaRepo()
  const CityStateRepo = makeCityStateRepo()
  const iBGEService = makeIbgeService()
  return new RegisterUserUseCase(
    registerUserRepo,
    saveUserSocialMediaRepo,
    CityStateRepo,
    iBGEService)
}

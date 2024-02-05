import { type AddUserPreference } from '@/domain/contracts/user/add-user-preference'
import { makeFindUserPreferenceByIdPrismaRepo } from '../../infra/db/prisma/user-preference/find-preference-by-id-prisma-repo-factory'
import { AddUserPreferenceUsecase } from '@/usecases/implementations/user-preference/add-user-preference/add-user-preference-usecase'
import { makeAddUserPreferencePrismaRepo } from '../../infra/db/prisma/user/add-user-preference-prisma-repo-factory'

export const makeAddUserPreferenceUseCase = (): AddUserPreference => {
  return new AddUserPreferenceUsecase(
    makeFindUserPreferenceByIdPrismaRepo(),
    makeAddUserPreferencePrismaRepo()
  )
}

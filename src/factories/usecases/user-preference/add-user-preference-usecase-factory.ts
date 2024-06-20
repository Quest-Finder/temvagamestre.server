import { makeFindUserPreferenceByIdPrismaRepo } from '../../infra/db/prisma/user-preference/find-preference-by-id-prisma-repo-factory'
import { AddUserPreferenceUsecase } from '@/usecases/implementations/user-preference/add-user-preference/add-user-preference-usecase'
import { makeAddUserPreferencePrismaRepo } from '../../infra/db/prisma/user-preference/add-user-preference-prisma-repo-factory'
import { type AddUserPreference } from '@/contracts/user-preference'

export const makeAddUserPreferenceUseCase = (): AddUserPreference => {
  return new AddUserPreferenceUsecase(
    makeFindUserPreferenceByIdPrismaRepo(),
    makeAddUserPreferencePrismaRepo()
  )
}

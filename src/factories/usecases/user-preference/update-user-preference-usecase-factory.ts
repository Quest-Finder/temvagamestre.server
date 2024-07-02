import { type UpdateUserPreference } from '@/contracts/user-preference'
import { UpdateUserPreferenceUseCase } from '@/usecases/implementations/user-preference/update-user-preference/update-user-preference-usecase'
import { makeFindUserPreferenceByIdPrismaRepo } from '../../infra/db/prisma/user-preference/find-preference-by-id-prisma-repo-factory'
import { makeUpdateUserPreferencePrismaRepo } from '../../infra/db/prisma/user-preference/update-user-preference-prisma-repo-factory'

export const makeUpdateUserPreferenceUsecase = (): UpdateUserPreference => {
  return new UpdateUserPreferenceUseCase(
    makeFindUserPreferenceByIdPrismaRepo(),
    makeUpdateUserPreferencePrismaRepo()
  )
}

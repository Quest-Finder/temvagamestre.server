import { type UpdateUserPreference } from '@/domain/contracts/user'
import { UpdateUserPreferenceUseCase } from '@/usecases/implementations/user-preference/update-user-preference/update-user-preference-usecase'
import { makeFindUserPreferenceByIdPrismaRepo } from '../../infra/db/prisma/user-preference/find-preference-by-id-prisma-repo-factory'
import { makeUpdateUserPreferenceRepo } from '../../infra/db/prisma/user/update-user-preference-repo-factory'

export const makeUpdateUserPreferenceUsecase = (): UpdateUserPreference => {
  return new UpdateUserPreferenceUseCase(
    makeFindUserPreferenceByIdPrismaRepo(),
    makeUpdateUserPreferenceRepo()
  )
}

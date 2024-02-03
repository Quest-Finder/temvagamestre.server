import { type UpdateUserPreference } from '@/domain/contracts/user'
import { UpdateUserPreferenceUseCase } from '@/usecases/implementations/preference/update-user-preference/update-user-preference-usecase'
import { makeFindPreferenceByIdPrismaRepo } from '../../infra/db/prisma/user/find-preference-by-id-prisma-repo-factory'
import { makeUpdateUserPreferenceRepo } from '../../infra/db/prisma/user/update-user-preference-repo-factory'

export const makeUpdateUserPreferenceUsecase = (): UpdateUserPreference => {
  return new UpdateUserPreferenceUseCase(
    makeFindPreferenceByIdPrismaRepo(),
    makeUpdateUserPreferenceRepo()
  )
}

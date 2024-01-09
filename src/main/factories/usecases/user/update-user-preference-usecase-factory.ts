import { type UpdateUserPreference } from '@/domain/contracts/user'
import { UpdateUserPreferenceUseCase } from '@/usecases/implementations/user/update-user-preference/update-user-preference-usecase'
import { makeFindPreferenceByIdRepo } from '../../infra/db/prisma/user/find-preference-by-id-repo-factory'
import { makeUpdateUserPreferenceRepo } from '../../infra/db/prisma/user/update-user-preference-repo-factory'

export const makeUpdateUserPreferenceUsecase = (): UpdateUserPreference => {
  return new UpdateUserPreferenceUseCase(
    makeFindPreferenceByIdRepo(),
    makeUpdateUserPreferenceRepo()
  )
}

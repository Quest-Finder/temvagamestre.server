import { type SaveUserPreferenceGamePlace } from '@/domain/contracts/user-preference-game-place'
import { makeFindPreferenceByIdPrismaRepo } from '../../infra/db/prisma/user/find-preference-by-id-prisma-repo-factory'
import { SaveUserPreferenceGamePlaceUsecase } from '@/usecases/implementations/user-preference-game-place/save-user-preference-game-place/save-user-preference-game-place-usecase'
import { makeSaveUserPreferenceGamePlacePrismaRepo } from '../../infra/db/prisma/user-preference-game-place/save-user-preference-game-place-prisma-repo-factory'

export const makeSaveUserPreferenceGamePlaceUsecase = (): SaveUserPreferenceGamePlace => {
  return new SaveUserPreferenceGamePlaceUsecase(
    makeFindPreferenceByIdPrismaRepo(),
    makeSaveUserPreferenceGamePlacePrismaRepo()
  )
}

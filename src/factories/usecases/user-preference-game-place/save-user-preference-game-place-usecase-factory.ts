import { type SaveUserPreferenceGamePlace } from '@/contracts/user-preference-game-place'
import { makeFindUserPreferenceByIdPrismaRepo } from '../../infra/db/prisma/user-preference/find-preference-by-id-prisma-repo-factory'
import { SaveUserPreferenceGamePlaceUsecase } from '@/usecases/implementations/user-preference-game-place/save-user-preference-game-place/save-user-preference-game-place-usecase'
import { makeSaveUserPreferenceGamePlacePrismaRepo } from '../../infra/db/prisma/user-preference-game-place/save-user-preference-game-place-prisma-repo-factory'

export const makeSaveUserPreferenceGamePlaceUsecase = (): SaveUserPreferenceGamePlace => {
  return new SaveUserPreferenceGamePlaceUsecase(
    makeFindUserPreferenceByIdPrismaRepo(),
    makeSaveUserPreferenceGamePlacePrismaRepo()
  )
}

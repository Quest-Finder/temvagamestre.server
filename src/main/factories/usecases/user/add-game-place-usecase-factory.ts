import { type AddGamePlace } from '@/domain/contracts/user'
import { AddGamePlaceUsecase } from '@/usecases/implementations/game-place/add-game-place/add-game-place-usecase'
import { makeFindPreferenceByIdPrismaRepo } from '../../infra/db/prisma/user/find-preference-by-id-prisma-repo-factory'
import { makeAddOrUpdateGamePlacePrismaRepo } from '../../infra/db/prisma/user/add-or-update-game-place-prisma-repo-factory'

export const makeAddGamePlaceUsecase = (): AddGamePlace => {
  return new AddGamePlaceUsecase(
    makeFindPreferenceByIdPrismaRepo(),
    makeAddOrUpdateGamePlacePrismaRepo()
  )
}

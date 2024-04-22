import { type AddPlayerProfile } from '@/domain/contracts/player-profile/add-player-profile'
import { AddPlayerProfileUsecase } from '@/usecases/implementations/player-profile/add-player-profile/add-player-profile-usecase'
import { makeAddPlayerProfilePrismaRepo } from '../../infra/db/prisma/player-profile/add-player-profile-prisma-repo-factory'
import { makeUuidAdapter } from '../../infra/id/uuid-adapter-factory'

export const makeAddPlayerProfileUsecase = (): AddPlayerProfile => {
  return new AddPlayerProfileUsecase(
    makeAddPlayerProfilePrismaRepo(),
    makeUuidAdapter()
  )
}

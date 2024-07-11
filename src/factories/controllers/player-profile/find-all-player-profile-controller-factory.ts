import { type Controller } from '@/contracts'
import { FindAllPlayerProfileController } from '@/controllers/player-profile/find-all-player-profile-controller'
import { makeLogControllerDecorator } from '@/factories/decorators'
import { FindAllPlayersProfilePrismaRepo } from '@/infra/database/prisma/data/player-profile/find-all-players-profile/find-all-players-profile-repo'
import { FindAllPlayersProfileUseCase } from '@/usecases/implementations/player-profile/find-all-players-profile/find-all-players-profile-usecase'

export const makeFindAllPlayerProfileController = (): Controller => {
  const findAllPlayerProfileRepo = new FindAllPlayersProfilePrismaRepo()
  const findAllPlayerProfileUseCase = new FindAllPlayersProfileUseCase(findAllPlayerProfileRepo)
  const controller = new FindAllPlayerProfileController(findAllPlayerProfileUseCase)
  return makeLogControllerDecorator(controller)
}

import { makeFindAllBadgeUseCase } from '@/main/factories/usecases/badge/find-all-badge-factory'
import { type Controller } from '@/presentation/contracts'
import { FindAllBadgeController } from '@/presentation/controllers/badge/find-all-badge/find-all-badge-controller'

export const makeFindAllBadgesController = (): Controller => {
  const useCase = makeFindAllBadgeUseCase()
  const controller = new FindAllBadgeController(useCase)
  return controller
}

import { type Controller } from '@/presentation/contracts'
import { CountyStateController } from '@/presentation/controllers/county-state/county-state-controller'
import { CountyStateValidation } from '@/validators/zod/county-state/county-state-zod-validation'
import { makeLogControllerDecorator } from '../../decorators'
import { makeCountyStateUsecase } from '../../usecases/county-state/make-county-state-factory'

export const makeCountyStateController = (): Controller => {
  const useCase = makeCountyStateUsecase()
  const validation = new CountyStateValidation()
  const controller = new CountyStateController(useCase, validation)
  return makeLogControllerDecorator(controller)
}

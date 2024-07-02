import { type Controller } from '@/contracts'
import { CityStateController } from '@/controllers/city-state/city-state-controller'
import { CityStateValidation } from '@/validators/city-state/city-state-zod-validation'
import { makeLogControllerDecorator } from '../../decorators'
import { makeCityStateUsecase } from '../../usecases/city-state/make-city-state-factory'

export const makeCityStateController = (): Controller => {
  const useCase = makeCityStateUsecase()
  const validation = new CityStateValidation()
  const controller = new CityStateController(useCase, validation)
  return makeLogControllerDecorator(controller)
}

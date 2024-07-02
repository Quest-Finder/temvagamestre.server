import { type GetCityState } from '@/contracts/county-state/get-county-state'
import { CityStateUsecase } from '@/usecases/implementations/city-state/city-state-usecase'
import { makeIbgeService } from '../../service/ibge/make-ibge-service-factory'

export const makeCityStateUsecase = (): GetCityState => {
  const ibgeService = makeIbgeService()
  return new CityStateUsecase(ibgeService)
}

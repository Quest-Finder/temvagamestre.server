import { type GetCityState } from '@/domain/contracts/county-state/get-county-state'
import { CityStateUsecase } from '@/usecases/implementations/city-state/city-state-usecase'
import { makeIbgeService } from '../../service/ibge/make-ibge-service-factory'

export const makeCityStateUsecase = (): GetCityState => {
  return new CityStateUsecase(makeIbgeService())
}

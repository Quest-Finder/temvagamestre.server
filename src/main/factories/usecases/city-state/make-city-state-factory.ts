import { type GetCityState } from '@/domain/contracts/county-state/get-county-state'
import { FetchRequestAdapter } from '@/infra/external-request/fetch-adapter/fetch-request-adapter'
import { IBGEServiceInfra } from '@/infra/services/ibge/ibge-service-infra'
import { CityStateUsecase } from '@/usecases/implementations/city-state/city-state-usecase'

export const makeCityStateUsecase = (): GetCityState => {
  const fetchRequestAdapter = new FetchRequestAdapter()
  return new CityStateUsecase(new IBGEServiceInfra(fetchRequestAdapter))
}

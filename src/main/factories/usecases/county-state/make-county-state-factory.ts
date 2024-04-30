import { type GetCountyState } from '@/domain/contracts/county-state/get-county-state'
import { FetchRequestAdapter } from '@/infra/external-request/fetch-adapter/fetch-request-adapter'
import { CountyStateUsecase } from '@/usecases/implementations/county-state/county-state-usecase'

export const makeCountyStateUsecase = (): GetCountyState => {
  return new CountyStateUsecase(new FetchRequestAdapter())
}

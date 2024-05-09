import { FetchRequestAdapter } from '@/infra/external-request/fetch-adapter/fetch-request-adapter'
import { IBGEServiceInfra } from '@/infra/services/ibge/ibge-service-infra'
import { type IBGEService } from '@/usecases/contracts/services/ibge/ibge-service'

export const makeIbgeService = (): IBGEService => {
  const fetchRequestAdapter = new FetchRequestAdapter()
  return new IBGEServiceInfra(fetchRequestAdapter)
}

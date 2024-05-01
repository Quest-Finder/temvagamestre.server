import { type ExternalRequest } from '@/usecases/contracts/external-request/external-request'

import { FetchRequestAdapter } from '@/infra/external-request/fetch-adapter/fetch-request-adapter'
import { type IBGEService } from '@/usecases/contracts/services/ibge/ibge-service'
import { IBGEServiceInfra } from './ibge-service-infra'

type SutTypes = {
  sut: IBGEService
  externalRequest: ExternalRequest
}

const makeSut = (): SutTypes => {
  const externalRequest = new FetchRequestAdapter()
  const sut = new IBGEServiceInfra(externalRequest)
  return {
    sut,
    externalRequest
  }
}

describe('IBGEServiceInfra', () => {
  it('should be returning true', async () => {
    const { sut } = makeSut()
    const result = await sut.execute({ uf: 'SP', city: 'São Paulo' })
    expect(result).toBe(true)
  })
  it('should be returning Error', async () => {
    const { sut } = makeSut()
    const result = await sut.execute({ uf: 'SP', city: 'Salvador' })
    expect(result).toBe(false)
  })
})

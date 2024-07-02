import { type ExternalRequest } from '@/usecases/contracts/external-request/external-request'

import { FetchRequestAdapter } from '@/infra/http/fetch-adapter/fetch-request-adapter'
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
    const { cities } = await sut.execute({ uf: 'AC' })
    expect(cities).toEqual([
      'acrelândia', 'assis brasil', 'brasiléia', 'bujari', 'capixaba', 'cruzeiro do sul',
      'epitaciolândia', 'feijó', 'jordão', 'mâncio lima', 'manoel urbano', 'marechal thaumaturgo',
      'plácido de castro', 'porto walter', 'rio branco', 'rodrigues alves', 'santa rosa do purus',
      'senador guiomard', 'sena madureira', 'tarauacá', 'xapuri', 'porto acre'
    ])
  })
  it('should be returning Error', async () => {
    const { sut } = makeSut()
    const { cityFounded } = await sut.execute({ uf: 'SP', city: 'Salvador' })
    expect(cityFounded).toBe(false)
  })
})

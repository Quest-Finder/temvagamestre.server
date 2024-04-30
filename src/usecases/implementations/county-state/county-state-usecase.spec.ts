import { CountyStateError } from '@/domain/errors/county-state-error'
import { type HttpResponse } from '@/presentation/types/http'
import { left, right } from '@/shared/either'
import { type ExternalRequest } from '@/usecases/contracts/external-request/external-request'
import { CountyStateUsecase } from './county-state-usecase'

global.fetch = jest.fn()

const makeExternalRequest = (): ExternalRequest => {
  class ExternalRequestStub implements ExternalRequest {
    async execute (): Promise<HttpResponse> {
      return await Promise.resolve({
        statusCode: 200,
        body: [{ nome: 'any_county' }]
      })
    }
  }
  return new ExternalRequestStub()
}

type SutTypes = {
  sut: CountyStateUsecase
  externalRequest: ExternalRequest
}

const makeSut = (): SutTypes => {
  const externalRequest = makeExternalRequest()
  const sut = new CountyStateUsecase(externalRequest)
  return {
    sut, externalRequest
  }
}

describe('CountyStateUsecase', () => {
  it('should be returning void', async () => {
    const { sut } = makeSut()
    const result = await sut.perform('any_uf', 'any_county')
    expect(result).toEqual(right())
  })
  it('should be returning Error', async () => {
    const { sut } = makeSut()
    const result = await sut.perform('any_uf', 'any_county_error')
    expect(result).toEqual(left(new CountyStateError()))
  })
})

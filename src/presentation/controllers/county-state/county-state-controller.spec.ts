import { type CountyStateResponse, type GetCountyState } from '@/domain/contracts/county-state/get-county-state'
import { CountyStateError } from '@/domain/errors/county-state-error'
import { badRequest, noContent } from '@/presentation/helpers/http-helpers'
import { left, right } from '@/shared/either'
import { CountyStateValidation } from '@/validators/zod/county-state/county-state-zod-validation'
import { CountyStateController } from './county-state-controller'

const makeCountyState = (error: boolean = false): GetCountyState => {
  class CountyStateStub implements GetCountyState {
    async perform (uf: string, county: string): Promise<CountyStateResponse> {
      return await Promise.resolve(error ? left(new CountyStateError()) : right())
    }
  }
  return new CountyStateStub()
}

type SutTypes = {
  sut: CountyStateController
  countyStateStub: GetCountyState
}

const makeSut = (error?: boolean): SutTypes => {
  const countyStateStub = makeCountyState(error)
  const sut = new CountyStateController(countyStateStub, new CountyStateValidation())
  return { countyStateStub, sut }
}

describe('CountyStateController', () => {
  it('Should call GetCountyState without value', async () => {
    const { sut } = makeSut()
    const response = await sut.handle({ body: { uf: '', county: '' } })
    expect(response.statusCode).toBe(400)
    expect(response.body.name).toEqual('ValidationError')
  })

  it('Should call GetCountyState with uf with more two characters', async () => {
    const { sut } = makeSut()
    const response = await sut.handle({ body: { uf: 'ufa', county: 'county' } })
    expect(response.statusCode).toBe(400)
    expect(response.body.name).toEqual('ValidationError')
  })

  it('Should call GetCountyState with uf with less two characters', async () => {
    const { sut } = makeSut()
    const response = await sut.handle({ body: { uf: 'u', county: 'county' } })
    expect(response.statusCode).toBe(400)
    expect(response.body.name).toEqual('ValidationError')
  })

  it('Should call GetCountyState with county with type diferent string', async () => {
    const { sut } = makeSut()
    const response = await sut.handle({ body: { uf: 'u', county: true } })
    expect(response.statusCode).toBe(400)
    expect(response.body.name).toEqual('ValidationError')
  })

  it('Should call GetCountyState with Error', async () => {
    const { sut } = makeSut(true)
    const httpResponse = await sut.handle({ body: { uf: 'uf', county: 'county' } })
    expect(httpResponse).toEqual(badRequest(new Error('county state')))
  })

  it('Should call GetCountyState with success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({ body: { uf: 'uf', county: 'county' } })
    expect(httpResponse).toEqual(noContent())
  })
})

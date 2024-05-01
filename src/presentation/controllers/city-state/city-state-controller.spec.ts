import { type CityStateResponse, type GetCityState } from '@/domain/contracts/county-state/get-county-state'
import { CityStateError } from '@/domain/errors'
import { badRequest, noContent } from '@/presentation/helpers/http-helpers'
import { left, right } from '@/shared/either'
import { CityStateValidation } from '@/validators/zod/city-state/city-state-zod-validation'
import { CityStateController } from './city-state-controller'

const makeCountyState = (error: boolean = false): GetCityState => {
  class CountyStateStub implements GetCityState {
    async perform (uf: string, county: string): Promise<CityStateResponse> {
      return await Promise.resolve(error ? left(new CityStateError()) : right())
    }
  }
  return new CountyStateStub()
}

type SutTypes = {
  sut: CityStateController
  countyStateStub: GetCityState
}

const makeSut = (error?: boolean): SutTypes => {
  const countyStateStub = makeCountyState(error)
  const sut = new CityStateController(countyStateStub, new CityStateValidation())
  return { countyStateStub, sut }
}

describe('CountyStateController', () => {
  it('Should call GetCityState without value', async () => {
    const { sut } = makeSut()
    const response = await sut.handle({ body: { uf: '', county: '' } })
    expect(response.statusCode).toBe(400)
    expect(response.body.name).toEqual('ValidationError')
  })

  it('Should call GetCityState with uf with more two characters', async () => {
    const { sut } = makeSut()
    const response = await sut.handle({ body: { uf: 'ufa', county: 'county' } })
    expect(response.statusCode).toBe(400)
    expect(response.body.name).toEqual('ValidationError')
  })

  it('Should call GetCityState with uf with less two characters', async () => {
    const { sut } = makeSut()
    const response = await sut.handle({ body: { uf: 'u', county: 'county' } })
    expect(response.statusCode).toBe(400)
    expect(response.body.name).toEqual('ValidationError')
  })

  it('Should call GetCityState with county with type diferent string', async () => {
    const { sut } = makeSut()
    const response = await sut.handle({ body: { uf: 'u', county: true } })
    expect(response.statusCode).toBe(400)
    expect(response.body.name).toEqual('ValidationError')
  })

  it('Should call GetCityState with Error', async () => {
    const { sut } = makeSut(true)
    const httpResponse = await sut.handle({ body: { uf: 'uf', county: 'county' } })
    expect(httpResponse).toEqual(badRequest(new Error('county state')))
  })

  it('Should call GetCityState with success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({ body: { uf: 'uf', county: 'county' } })
    expect(httpResponse).toEqual(noContent())
  })
})

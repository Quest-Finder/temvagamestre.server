import { type CityStateResponse, type GetCityState } from '@/domain/contracts/county-state/get-county-state'
import { CityStateError } from '@/domain/errors'
import { badRequest, noContent } from '@/presentation/helpers/http-helpers'
import { left, right } from '@/shared/either'
import { CityStateValidation } from '@/validators/zod/city-state/city-state-zod-validation'
import { CityStateController } from './city-state-controller'

const makecityState = (error: boolean = false): GetCityState => {
  class CityStateStub implements GetCityState {
    async perform (uf: string, city: string): Promise<CityStateResponse> {
      return await Promise.resolve(error ? left(new CityStateError()) : right())
    }
  }
  return new CityStateStub()
}

type SutTypes = {
  sut: CityStateController
  cityStateStub: GetCityState
}

const makeSut = (error?: boolean): SutTypes => {
  const cityStateStub = makecityState(error)
  const sut = new CityStateController(cityStateStub, new CityStateValidation())
  return { cityStateStub, sut }
}

describe('cityStateController', () => {
  it('Should call GetCityState without value', async () => {
    const { sut } = makeSut()
    const response = await sut.handle({ body: { uf: '', city: '' } })
    expect(response.statusCode).toBe(400)
    expect(response.body.name).toEqual('ValidationError')
  })

  it('Should call GetCityState with uf with more two characters', async () => {
    const { sut } = makeSut()
    const response = await sut.handle({ body: { uf: 'ufa', city: 'city' } })
    expect(response.statusCode).toBe(400)
    expect(response.body.name).toEqual('ValidationError')
  })

  it('Should call GetCityState with uf with less two characters', async () => {
    const { sut } = makeSut()
    const response = await sut.handle({ body: { uf: 'u', city: 'city' } })
    expect(response.statusCode).toBe(400)
    expect(response.body.name).toEqual('ValidationError')
  })

  it('Should call GetCityState with city with type diferent string', async () => {
    const { sut } = makeSut()
    const response = await sut.handle({ body: { uf: 'u', city: true } })
    expect(response.statusCode).toBe(400)
    expect(response.body.name).toEqual('ValidationError')
  })

  it('Should call GetCityState with Error', async () => {
    const { sut } = makeSut(true)
    const httpResponse = await sut.handle({ body: { uf: 'uf', city: 'city' } })
    expect(httpResponse).toEqual(badRequest(new Error('city state')))
  })

  it('Should call GetCityState with success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({ body: { uf: 'uf', city: 'city' } })
    expect(httpResponse).toEqual(noContent())
  })
})

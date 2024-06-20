import { type CityStateProps } from '@/entities/user/value-objects/city-state/city-state'
import { CityStateError } from '@/errors'
import { left, right } from '@/shared/either'
import { type IBGEService, type IBGEServiceResponse } from '@/usecases/contracts/services/ibge/ibge-service'
import { CityStateUsecase } from './city-state-usecase'

const makeIBGEService = (): IBGEService => {
  class IBGEServiceStub implements IBGEService {
    async execute ({ uf }: CityStateProps): Promise<IBGEServiceResponse> {
      return await Promise.resolve({ cities: ['any_city'], cityFounded: false })
    }
  }
  return new IBGEServiceStub()
}

type SutTypes = {
  sut: CityStateUsecase
  ibgeService: IBGEService
}

const makeSut = (): SutTypes => {
  const ibgeService = makeIBGEService()
  const sut = new CityStateUsecase(ibgeService)
  return {
    sut, ibgeService
  }
}

describe('CountyStateUsecase', () => {
  it('should be returning list of cities', async () => {
    const { sut } = makeSut()
    const result = await sut.perform('any_uf', {})
    expect(result).toEqual(right(['any_city']))
  })
  it('should be returning Error', async () => {
    const { sut, ibgeService } = makeSut()
    ibgeService.execute = jest.fn().mockResolvedValueOnce({
      cities: []
    })
    const result = await sut.perform('any_uf', {})
    expect(result).toEqual(left(new CityStateError()))
  })
})

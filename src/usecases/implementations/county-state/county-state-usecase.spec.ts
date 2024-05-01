import { CountyStateError } from '@/domain/errors/county-state-error'
import { left, right } from '@/shared/either'
import { type IBGEService } from '@/usecases/contracts/services/ibge/ibge-service'
import { CountyStateUsecase } from './county-state-usecase'

const makeIBGEService = (): IBGEService => {
  class IBGEServiceStub implements IBGEService {
    async execute (uf: string, county: string): Promise<boolean> {
      return await Promise.resolve(true)
    }
  }
  return new IBGEServiceStub()
}

type SutTypes = {
  sut: CountyStateUsecase
  ibgeService: IBGEService
}

const makeSut = (): SutTypes => {
  const ibgeService = makeIBGEService()
  const sut = new CountyStateUsecase(ibgeService)
  return {
    sut, ibgeService
  }
}

describe('CountyStateUsecase', () => {
  it('should be returning void', async () => {
    const { sut } = makeSut()
    const result = await sut.perform('any_uf', 'any_county')
    expect(result).toEqual(right())
  })
  it('should be returning Error', async () => {
    const { sut, ibgeService } = makeSut()
    ibgeService.execute = jest.fn().mockResolvedValueOnce(false)
    const result = await sut.perform('any_uf', 'any_county_error')
    expect(result).toEqual(left(new CountyStateError()))
  })
})

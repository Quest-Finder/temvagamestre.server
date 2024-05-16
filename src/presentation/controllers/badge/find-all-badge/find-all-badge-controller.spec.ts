import { type FindAllBadge, type FindAllBadgeResponse } from '@/domain/contracts/badge/find-all-badge'
import { type Controller } from '@/presentation/contracts'
import { right } from '@/shared/either'
import { FindAllBadgeController } from './find-all-badge-controller'

type MakeSutType = {
  sut: Controller
  useCase: FindAllBadge
}

class FindAllBadgeStub implements FindAllBadge {
  async perform (): Promise<FindAllBadgeResponse> {
    return await Promise.resolve(right([]))
  }
}

const makeSut = (): MakeSutType => {
  const useCase = new FindAllBadgeStub()
  const sut = new FindAllBadgeController(useCase)
  return {
    sut,
    useCase
  }
}

describe('FindAllBadgeController', () => {
  it('should call usecase 1 time', async () => {
    const { sut, useCase } = makeSut()
    const useCaseSpy = jest.spyOn(useCase, 'perform')
    await sut.handle({})
    expect(useCaseSpy).toHaveBeenCalledTimes(1)
  })
})

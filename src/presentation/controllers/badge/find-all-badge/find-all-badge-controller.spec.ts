import { type FindAllBadge, type FindAllBadgeResponse } from '@/domain/contracts/badge/find-all-badge'
import { type BadgeModel } from '@/domain/models/badge/badge-model'
import { type Controller } from '@/presentation/contracts'
import { ok, serverError } from '@/presentation/helpers/http-helpers'
import { left, right } from '@/shared/either'
import { FindAllBadgeController } from './find-all-badge-controller'

type MakeSutType = {
  sut: Controller
  useCase: FindAllBadge
}

const makeFakeBadgeList = (): BadgeModel[] => {
  return [
    {
      id: 'some_id',
      name: 'some-name',
      description: 'some-description',
      icon: 'https://some-server/some-name.png',
      type: 'any',
      criteria: 'any'
    }, {
      id: 'some_id-2',
      name: 'some-name-2',
      description: 'some-description-2',
      icon: 'https://some-server/some-name-2.png',
      type: 'any-2',
      criteria: 'any-2'
    }
  ]
}

class FindAllBadgeStub implements FindAllBadge {
  async perform (): Promise<FindAllBadgeResponse> {
    return await Promise.resolve(right(makeFakeBadgeList()))
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
  it('should call usecase one time', async () => {
    const { sut, useCase } = makeSut()
    const useCaseSpy = jest.spyOn(useCase, 'perform')
    await sut.handle({})
    expect(useCaseSpy).toHaveBeenCalledTimes(1)
  })

  it('should return 500 if usecase return a error', async () => {
    const { sut, useCase } = makeSut()
    jest.spyOn(useCase, 'perform').mockResolvedValue(left(new Error('any error')))
    const response = await sut.handle({})
    expect(response).toEqual(serverError(new Error('Server error')))
  })

  it('should return 200 with a valid data when exits', async () => {
    const { sut } = makeSut()
    const response = await sut.handle({})
    expect(response).toEqual(ok(makeFakeBadgeList()))
  })
})

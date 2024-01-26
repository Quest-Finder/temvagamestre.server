import { type FindManyRpgStyles, type FindManyRpgStylesResponse } from '@/domain/contracts/rpg-style'
import { type RpgStyleModel } from '@/domain/models'
import { right } from '@/shared/either'
import { FindManyRpgStylesController } from './find-many-rpg-styles-controller'
import { serverError } from '@/presentation/helpers/http-helpers'

const makeFakeRpgStyleModel = (): RpgStyleModel => ({
  id: 'any_rpg_style_id',
  name: 'any_rpg_style_name'
})

const makeFindManyRpgStyles = (): FindManyRpgStyles => {
  class FindManyRpgStylesStub implements FindManyRpgStyles {
    async perform (): Promise<FindManyRpgStylesResponse> {
      return await Promise.resolve(right([makeFakeRpgStyleModel()]))
    }
  }
  return new FindManyRpgStylesStub()
}

type SutTypes = {
  sut: FindManyRpgStylesController
  findManyRpgStylesStub: FindManyRpgStyles
}

const makeSut = (): SutTypes => {
  const findManyRpgStylesStub = makeFindManyRpgStyles()
  const sut = new FindManyRpgStylesController(findManyRpgStylesStub)

  return {
    findManyRpgStylesStub,
    sut
  }
}

describe('FindManyRpgStylesController', () => {
  it('Should call FindManyRpgStyles with no value', async () => {
    const { sut, findManyRpgStylesStub } = makeSut()
    const performSpy = jest.spyOn(findManyRpgStylesStub, 'perform')
    await sut.handle()

    expect(performSpy).toHaveBeenCalledTimes(1)
    expect(performSpy).toHaveBeenCalledWith()
  })

  it('Should return 500 if FindManyRpgStyles throws', async () => {
    const { sut, findManyRpgStylesStub } = makeSut()
    jest.spyOn(findManyRpgStylesStub, 'perform').mockReturnValueOnce(Promise.resolve(Promise.reject(new Error())))
    const httpResponse = await sut.handle()
    expect(httpResponse).toEqual(serverError())
  })
})

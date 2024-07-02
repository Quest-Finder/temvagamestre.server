import type { FindManyRpgStyles } from '@/contracts/rpg-style'
import { type RpgStyleModel } from '@/models'
import { ok, serverError } from '@/helpers/http/http-helpers'
import { FindManyRpgStylesController } from './find-many-rpg-styles-controller'

const makeFakeRpgStyleModel = (): RpgStyleModel[] => ([{
  id: 'any_rpg_style_id',
  name: 'any_rpg_style_name'
}, {
  id: 'other_rpg_style_id',
  name: 'other_rpg_style_name'
}])

const makeFindManyRpgStyles = (): FindManyRpgStyles => {
  class FindManyRpgStylesStub implements FindManyRpgStyles {
    async perform (): Promise<RpgStyleModel[]> {
      return await Promise.resolve(makeFakeRpgStyleModel())
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
  return { findManyRpgStylesStub, sut }
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
    jest.spyOn(findManyRpgStylesStub, 'perform').mockReturnValueOnce(
      Promise.reject(new Error())
    )
    const httpResponse = await sut.handle()
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  it('Should return 200 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle()
    expect(httpResponse).toEqual(ok(makeFakeRpgStyleModel()))
  })
})

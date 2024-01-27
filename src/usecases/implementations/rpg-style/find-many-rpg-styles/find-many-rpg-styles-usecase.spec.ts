import { type RpgStyleModel } from '@/domain/models'
import { type FindManyRpgStylesRepo } from '@/usecases/contracts/db/rpg-style'
import { FindManyRpgStylesUsecase } from './find-many-rpg-styles-usecase'

const makeFakeRpgStyleModel = (): RpgStyleModel => ({
  id: 'any_rpg_style_id',
  name: 'any_rpg_style_name'
})

const makeFindManyRpgStylesRepo = (): FindManyRpgStylesRepo => {
  class FindManyRpgStylesRepoStub implements FindManyRpgStylesRepo {
    async execute (): Promise<RpgStyleModel[] | []> {
      return await Promise.resolve([makeFakeRpgStyleModel()])
    }
  }
  return new FindManyRpgStylesRepoStub()
}

type SutTypes = {
  sut: FindManyRpgStylesUsecase
  findManyRpgStylesRepoStub: FindManyRpgStylesRepo
}

const makeSut = (): SutTypes => {
  const findManyRpgStylesRepoStub = makeFindManyRpgStylesRepo()
  const sut = new FindManyRpgStylesUsecase(findManyRpgStylesRepoStub)

  return {
    findManyRpgStylesRepoStub,
    sut
  }
}

describe('FindManyRpgStylesUsecase', () => {
  it('Should call FindManyRpgStylesRepo with no values', async () => {
    const { sut, findManyRpgStylesRepoStub } = makeSut()
    const executeSpy = jest.spyOn(findManyRpgStylesRepoStub, 'execute')
    await sut.perform()
    expect(executeSpy).toHaveBeenCalledTimes(1)
    expect(executeSpy).toHaveBeenCalledWith()
  })

  it('Should throw if FindManyRpgStylesRepo throws', async () => {
    const { sut, findManyRpgStylesRepoStub } = makeSut()
    jest.spyOn(findManyRpgStylesRepoStub, 'execute').mockReturnValueOnce(Promise.reject(new Error()))
    const promise = sut.perform()
    await expect(promise).rejects.toThrow()
  })

  it('Should return right result on success', async () => {
    const { sut } = makeSut()
    const result = await sut.perform()
    expect(result.isRight()).toBe(true)
  })
})

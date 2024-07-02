import { type RpgStyleModel } from '@/models'
import { type FindManyRpgStylesRepo } from '@/usecases/contracts/db/rpg-style'
import { FindManyRpgStylesUsecase } from './find-many-rpg-styles-usecase'

const makeFakeRpgStyles = (): RpgStyleModel[] => ([{
  id: 'any_id',
  name: 'any_name'
}, {
  id: 'other_id',
  name: 'other_name'
}])

const makeFindManyRpgStylesRepo = (): FindManyRpgStylesRepo => {
  class FindManyRpgStylesRepoStub implements FindManyRpgStylesRepo {
    async execute (): Promise<RpgStyleModel[]> {
      return await Promise.resolve(makeFakeRpgStyles())
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
  return { sut, findManyRpgStylesRepoStub }
}

describe('FindManyRpgStylesUsecase', () => {
  it('Should call FindManyRpgStylesRepo', async () => {
    const { sut, findManyRpgStylesRepoStub } = makeSut()
    const executeSpy = jest.spyOn(findManyRpgStylesRepoStub, 'execute')
    await sut.perform()
    expect(executeSpy).toHaveBeenCalledTimes(1)
    expect(executeSpy).toHaveBeenCalled()
  })

  it('Should throw if FindManyRpgStylesRepo throws', async () => {
    const { sut, findManyRpgStylesRepoStub } = makeSut()
    jest.spyOn(findManyRpgStylesRepoStub, 'execute').mockReturnValueOnce(Promise.reject(new Error()))
    const promise = sut.perform()
    await expect(promise).rejects.toThrow()
  })

  it('Should return all rpg styles on success', async () => {
    const { sut } = makeSut()
    const result = await sut.perform()
    expect(result).toEqual(makeFakeRpgStyles())
  })
})

import { type RpgStyleModel } from '@/domain/models'
import { type AddRpgStyleRepo, type FindRpgStyleByNameRepo } from '@/usecases/contracts/db/rpg-style'
import { type IdBuilder } from '@/usecases/contracts/id'
import { AddRpgStyleUsecase } from './add-rpg-style-usecase'
import { RpgStyles } from '@/domain/contracts/rpg-style'

const makeFakeRpgStyleModel = (): RpgStyleModel => ({
  id: 'any_rpg_style_id',
  name: 'any_rpg_style_name'
})

const makeIdBuilder = (): IdBuilder => {
  class IdBuilderStub implements IdBuilder {
    build (): string { return 'any_social_media_id' }
  }
  return new IdBuilderStub()
}

const makeFindRpgStyleByNameRepo = (): FindRpgStyleByNameRepo => {
  class FindRpgStyleByNameRepoStub implements FindRpgStyleByNameRepo {
    async execute (name: string): Promise<RpgStyleModel | null> {
      return await Promise.resolve(null)
    }
  }
  return new FindRpgStyleByNameRepoStub()
}

const makeAddRpgStyleRepo = (): AddRpgStyleRepo => {
  class AddRpgStyleRepoStub implements AddRpgStyleRepo {
    async execute (data: RpgStyleModel): Promise<void> {
      await Promise.resolve()
    }
  }
  return new AddRpgStyleRepoStub()
}

type SutTypes = {
  sut: AddRpgStyleUsecase
  addRpgStyleRepo: AddRpgStyleRepo
  findRpgStyleByNameRepo: FindRpgStyleByNameRepo
  idBuilder: IdBuilder
}

const makeSut = (): SutTypes => {
  const addRpgStyleRepo = makeAddRpgStyleRepo()
  const findRpgStyleByNameRepo = makeFindRpgStyleByNameRepo()
  const idBuilder = makeIdBuilder()
  const sut = new AddRpgStyleUsecase(addRpgStyleRepo, findRpgStyleByNameRepo, idBuilder)

  return {
    sut,
    addRpgStyleRepo,
    findRpgStyleByNameRepo,
    idBuilder
  }
}

describe('AddRpgStyleUsecase', () => {
  it('Should call FindRpgStyleByNameRepo with correct rpg style name', async () => {
    const { sut, findRpgStyleByNameRepo } = makeSut()
    const executeSpy = jest.spyOn(findRpgStyleByNameRepo, 'execute')
    await sut.perform()
    expect(executeSpy).toHaveBeenCalledTimes(RpgStyles.getRpgStyles().length)
    expect(executeSpy).toHaveBeenCalledWith(RpgStyles.getRpgStyles()[0])
  })
})

import { type AddUserPreferenceData } from '@/domain/contracts/user/add-user-preference'
import { type PreferenceModel } from '@/domain/models'
import { type AddUserPreferenceRepo, type FindPreferenceByIdRepo } from '@/usecases/contracts/db/user'
import { AddUserPreferenceUsecase } from './add-user-preference-usecase'

const makeFakePreferenceModel = (): PreferenceModel => ({
  id: 'any_user_id',
  frequency: 'daily',
  activeType: 'gameMaster'
})

const makeFindPreferenceByIdRepo = (): FindPreferenceByIdRepo => {
  class FindPreferenceByIdRepoStub implements FindPreferenceByIdRepo {
    async execute (id: string): Promise<PreferenceModel | null> {
      return await Promise.resolve(makeFakePreferenceModel())
    }
  }

  return new FindPreferenceByIdRepoStub()
}

const makeAddUserPreferenceRepo = (): AddUserPreferenceRepo => {
  class AddUserPreferenceRepoStub implements AddUserPreferenceRepo {
    async execute (data: AddUserPreferenceData): Promise<void> {
      await Promise.resolve()
    }
  }
  return new AddUserPreferenceRepoStub()
}

type SutTypes = {
  sut: AddUserPreferenceUsecase
  addUserPreferenceRepoStub: AddUserPreferenceRepo
  findPreferenceByIdRepoStub: FindPreferenceByIdRepo
}

const makeSut = (): SutTypes => {
  const findPreferenceByIdRepoStub = makeFindPreferenceByIdRepo()
  const addUserPreferenceRepoStub = makeAddUserPreferenceRepo()
  const sut = new AddUserPreferenceUsecase(findPreferenceByIdRepoStub, addUserPreferenceRepoStub)

  return {
    sut,
    addUserPreferenceRepoStub,
    findPreferenceByIdRepoStub
  }
}

describe('AddUserPreferenceUsecase', () => {
  it('Should call FindPreferenceByIdRepo with correct values', async () => {
    const { sut, findPreferenceByIdRepoStub } = makeSut()
    const executeSpy = jest.spyOn(findPreferenceByIdRepoStub, 'execute')
    await sut.perform(makeFakePreferenceModel())
    expect(executeSpy).toHaveBeenCalledWith('any_user_id')
  })
})

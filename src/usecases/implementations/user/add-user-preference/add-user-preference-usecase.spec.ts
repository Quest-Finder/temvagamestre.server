import { type AddUserPreferenceData } from '@/domain/contracts/user/add-user-preference'
import { type PreferenceModel } from '@/domain/models'
import { type AddUserPreferenceRepo, type FindPreferenceByIdRepo } from '@/usecases/contracts/db/user'
import { AddUserPreferenceUsecase } from './add-user-preference-usecase'
import { ExistentUserPreferenceError } from '@/domain/errors'

const makeFakePreferenceModel = (): PreferenceModel => ({
  id: 'any_user_id',
  frequency: 'daily',
  activeType: 'gameMaster'
})

const makeFindPreferenceByIdRepo = (): FindPreferenceByIdRepo => {
  class FindPreferenceByIdRepoStub implements FindPreferenceByIdRepo {
    async execute (id: string): Promise<PreferenceModel | null> {
      return await Promise.resolve(null)
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

  it('Should return ExistentUserPreferencesError if FindPreferenceByIdRepo returns a preference', async () => {
    const { sut, findPreferenceByIdRepoStub } = makeSut()
    jest.spyOn(findPreferenceByIdRepoStub, 'execute').mockReturnValueOnce(Promise.resolve(makeFakePreferenceModel()))
    const result = await sut.perform(makeFakePreferenceModel())
    expect(result.value).toEqual(new ExistentUserPreferenceError('any_user_id'))
  })

  it('Should call AddUserPreferenceRepo with correct values', async () => {
    const { sut, addUserPreferenceRepoStub } = makeSut()
    const executeSpy = jest.spyOn(addUserPreferenceRepoStub, 'execute')
    await sut.perform(makeFakePreferenceModel())
    expect(executeSpy).toHaveBeenCalledWith(makeFakePreferenceModel())
  })

  // it('Should throw if AddUserPreferenceRepo throws', async () => {
  //   const { sut, addUserPreferenceRepoStub } = makeSut()
  //   jest.spyOn(addUserPreferenceRepoStub, 'execute').mockReturnValueOnce(Promise.reject(new Error()))
  //   const promise = sut.perform(makeFakePreferenceModel())
  //   await expect(promise).rejects.toThrow()
  // })
})

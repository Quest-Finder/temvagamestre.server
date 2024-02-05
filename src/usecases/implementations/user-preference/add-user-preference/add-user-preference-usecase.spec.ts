import { type AddUserPreferenceData } from '@/domain/contracts/user/add-user-preference'
import { ExistentUserPreferenceError } from '@/domain/errors'
import { type UserPreferenceModel } from '@/domain/models'
import { type AddUserPreferenceRepo } from '@/usecases/contracts/db/user'
import { type FindUserPreferenceByIdRepo } from '@/usecases/contracts/db/user-preference'
import { AddUserPreferenceUsecase } from './add-user-preference-usecase'

const makeFakeUserPreferenceModel = (): UserPreferenceModel => ({
  id: 'any_user_id',
  frequency: 'daily',
  activeType: 'gameMaster'
})

const makeFindUserPreferenceByIdRepo = (): FindUserPreferenceByIdRepo => {
  class FindUserPreferenceByIdRepoStub implements FindUserPreferenceByIdRepo {
    async execute (id: string): Promise<UserPreferenceModel | null> {
      return await Promise.resolve(null)
    }
  }
  return new FindUserPreferenceByIdRepoStub()
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
  findUserPreferenceByIdRepoStub: FindUserPreferenceByIdRepo
  addUserPreferenceRepoStub: AddUserPreferenceRepo
}

const makeSut = (): SutTypes => {
  const findUserPreferenceByIdRepoStub = makeFindUserPreferenceByIdRepo()
  const addUserPreferenceRepoStub = makeAddUserPreferenceRepo()
  const sut = new AddUserPreferenceUsecase(findUserPreferenceByIdRepoStub, addUserPreferenceRepoStub)
  return { sut, findUserPreferenceByIdRepoStub, addUserPreferenceRepoStub }
}

describe('AddUserPreferenceUsecase', () => {
  it('Should call FindUserPreferenceByIdRepo with correct values', async () => {
    const { sut, findUserPreferenceByIdRepoStub } = makeSut()
    const executeSpy = jest.spyOn(findUserPreferenceByIdRepoStub, 'execute')
    await sut.perform(makeFakeUserPreferenceModel())
    expect(executeSpy).toHaveBeenCalledWith('any_user_id')
  })

  it('Should return ExistentUserPreferencesError if FindUserPreferenceByIdRepo returns a preference', async () => {
    const { sut, findUserPreferenceByIdRepoStub } = makeSut()
    jest.spyOn(findUserPreferenceByIdRepoStub, 'execute').mockReturnValueOnce(
      Promise.resolve(makeFakeUserPreferenceModel())
    )
    const result = await sut.perform(makeFakeUserPreferenceModel())
    expect(result.value).toEqual(new ExistentUserPreferenceError('any_user_id'))
  })

  it('Should call AddUserPreferenceRepo with correct values', async () => {
    const { sut, addUserPreferenceRepoStub } = makeSut()
    const executeSpy = jest.spyOn(addUserPreferenceRepoStub, 'execute')
    await sut.perform(makeFakeUserPreferenceModel())
    expect(executeSpy).toHaveBeenCalledWith(makeFakeUserPreferenceModel())
  })

  it('Should throw if AddUserPreferenceRepo throws', async () => {
    const { sut, addUserPreferenceRepoStub } = makeSut()
    jest.spyOn(addUserPreferenceRepoStub, 'execute').mockReturnValueOnce(
      Promise.reject(new Error())
    )
    const promise = sut.perform(makeFakeUserPreferenceModel())
    await expect(promise).rejects.toThrow()
  })

  it('Should return right result on success', async () => {
    const { sut } = makeSut()
    const result = await sut.perform(makeFakeUserPreferenceModel())
    expect(result.isRight()).toBe(true)
  })
})

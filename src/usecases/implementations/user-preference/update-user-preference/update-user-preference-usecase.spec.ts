import { type UpdateUserPreferenceData } from '@/domain/contracts/user'
import { NonExistentUserPreferenceError } from '@/domain/errors'
import { type UserPreferenceModel } from '@/domain/models'
import { type UpdateUserPreferenceRepo } from '@/usecases/contracts/db/user'
import { UpdateUserPreferenceUseCase } from './update-user-preference-usecase'
import { type FindUserPreferenceByIdRepo } from '@/usecases/contracts/db/user-preference'

const makeFakeUserPreferenceModel = (): UserPreferenceModel => ({
  id: 'any_user_id',
  frequency: 'daily',
  activeType: 'gameMaster'
})

const makeFakeUpdateUserPreferenceData = (): UpdateUserPreferenceData => ({
  id: 'any_user_id',
  frequency: 'daily'
})

const makeFindUserPreferenceByIdRepo = (): FindUserPreferenceByIdRepo => {
  class FindUserPreferenceByIdRepoStub implements FindUserPreferenceByIdRepo {
    async execute (id: string): Promise<UserPreferenceModel | null> {
      return await Promise.resolve(makeFakeUserPreferenceModel())
    }
  }
  return new FindUserPreferenceByIdRepoStub()
}

const makeUpdateUserPreferenceRepo = (): UpdateUserPreferenceRepo => {
  class UpdateUserPreferenceRepoStub implements UpdateUserPreferenceRepo {
    async execute (data: UpdateUserPreferenceData): Promise<void> {
      await Promise.resolve()
    }
  }
  return new UpdateUserPreferenceRepoStub()
}

type SutTypes = {
  sut: UpdateUserPreferenceUseCase
  findUserPreferenceByIdRepoStub: FindUserPreferenceByIdRepo
  updateUserPreferenceRepoStub: UpdateUserPreferenceRepo
}

const makeSut = (): SutTypes => {
  const findUserPreferenceByIdRepoStub = makeFindUserPreferenceByIdRepo()
  const updateUserPreferenceRepoStub = makeUpdateUserPreferenceRepo()
  const sut = new UpdateUserPreferenceUseCase(findUserPreferenceByIdRepoStub, updateUserPreferenceRepoStub)
  return { sut, findUserPreferenceByIdRepoStub, updateUserPreferenceRepoStub }
}

describe('UpdateUserPreferenceUsecase', () => {
  it('Should call FindUserPreferenceByIdRepo with correct values', async () => {
    const { sut, findUserPreferenceByIdRepoStub } = makeSut()
    const executeSpy = jest.spyOn(findUserPreferenceByIdRepoStub, 'execute')
    await sut.perform(makeFakeUpdateUserPreferenceData())
    expect(executeSpy).toHaveBeenCalledWith('any_user_id')
  })

  it('Should return NonExistentUserPreferencesError if FindUserPreferenceByIdRepo returns null', async () => {
    const { sut, findUserPreferenceByIdRepoStub } = makeSut()
    jest.spyOn(findUserPreferenceByIdRepoStub, 'execute').mockReturnValueOnce(
      Promise.resolve(null)
    )
    const result = await sut.perform(makeFakeUpdateUserPreferenceData())
    expect(result.value).toEqual(new NonExistentUserPreferenceError('any_user_id'))
  })

  it('Should call UpdateUserPreferenceRepo with correct values', async () => {
    const { sut, updateUserPreferenceRepoStub } = makeSut()
    const executeSpy = jest.spyOn(updateUserPreferenceRepoStub, 'execute')
    await sut.perform(makeFakeUpdateUserPreferenceData())
    expect(executeSpy).toHaveBeenCalledWith(makeFakeUpdateUserPreferenceData())
  })

  it('Should throw if UpdateUserPreferenceRepo throws', async () => {
    const { sut, updateUserPreferenceRepoStub } = makeSut()
    jest.spyOn(updateUserPreferenceRepoStub, 'execute').mockReturnValueOnce(
      Promise.reject(new Error())
    )
    const promise = sut.perform(makeFakeUpdateUserPreferenceData())
    await expect(promise).rejects.toThrow()
  })

  it('Should return right result on success', async () => {
    const { sut } = makeSut()
    const result = await sut.perform(makeFakeUpdateUserPreferenceData())
    expect(result.isRight()).toBe(true)
  })
})

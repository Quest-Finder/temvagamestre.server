import { NonExistentUserPreferenceError } from '@/errors'
import type { UserPreferenceGamePlaceModel, UserPreferenceModel } from '@/models'
import { type SaveUserPreferenceGamePlaceRepo } from '@/usecases/contracts/db/user-preference-game-place'
import { SaveUserPreferenceGamePlaceUsecase } from './save-user-preference-game-place-usecase'
import { type SaveUserPreferenceGamePlaceData } from '@/contracts/user-preference-game-place'
import { type FindUserPreferenceByIdRepo } from '@/usecases/contracts/db/user-preference'

const makeFakeSaveUserPreferenceGamePlaceData = (): SaveUserPreferenceGamePlaceData => ({
  userId: 'any_id',
  online: true,
  inPerson: false
})

const makeFakeUserPreferenceModel = (): UserPreferenceModel => ({
  id: 'any_id',
  frequency: 'daily',
  activeType: 'gameMaster'
})

const makeFindUserPreferenceByIdRepo = (): FindUserPreferenceByIdRepo => {
  class FindUserPreferenceByIdRepoStub implements FindUserPreferenceByIdRepo {
    async execute (id: string): Promise<UserPreferenceModel | null> {
      return await Promise.resolve(makeFakeUserPreferenceModel())
    }
  }
  return new FindUserPreferenceByIdRepoStub()
}

const makeSaveUserPreferenceGamePlaceRepo = (): SaveUserPreferenceGamePlaceRepo => {
  class SaveUserPreferenceGamePlaceRepoStub implements SaveUserPreferenceGamePlaceRepo {
    async execute (data: UserPreferenceGamePlaceModel): Promise<void> {
      await Promise.resolve()
    }
  }
  return new SaveUserPreferenceGamePlaceRepoStub()
}

type SutTypes = {
  sut: SaveUserPreferenceGamePlaceUsecase
  findUserPreferenceByIdRepoStub: FindUserPreferenceByIdRepo
  saveUserPreferenceGamePlaceRepoStub: SaveUserPreferenceGamePlaceRepo
}

const makeSut = (): SutTypes => {
  const findUserPreferenceByIdRepoStub = makeFindUserPreferenceByIdRepo()
  const saveUserPreferenceGamePlaceRepoStub = makeSaveUserPreferenceGamePlaceRepo()
  const sut = new SaveUserPreferenceGamePlaceUsecase(
    findUserPreferenceByIdRepoStub, saveUserPreferenceGamePlaceRepoStub
  )
  return { sut, findUserPreferenceByIdRepoStub, saveUserPreferenceGamePlaceRepoStub }
}

describe('SaveUserPreferenceGamePlaceUsecase', () => {
  it('Should call FindUserPreferenceByIdRepo with correct values', async () => {
    const { sut, findUserPreferenceByIdRepoStub } = makeSut()
    const executeSpy = jest.spyOn(findUserPreferenceByIdRepoStub, 'execute')
    await sut.perform(makeFakeSaveUserPreferenceGamePlaceData())
    expect(executeSpy).toHaveBeenCalledWith('any_id')
  })

  it('Should return NonExistentUserPreferencesError if FindUserPreferenceByIdRepo returns null', async () => {
    const { sut, findUserPreferenceByIdRepoStub } = makeSut()
    jest.spyOn(findUserPreferenceByIdRepoStub, 'execute').mockReturnValueOnce(
      Promise.resolve(null)
    )
    const result = await sut.perform(makeFakeSaveUserPreferenceGamePlaceData())
    expect(result.value).toEqual(new NonExistentUserPreferenceError('any_id'))
  })

  it('Should call SaveUserPreferenceGamePlaceRepo with correct values', async () => {
    const { sut, saveUserPreferenceGamePlaceRepoStub } = makeSut()
    const executeSpy = jest.spyOn(saveUserPreferenceGamePlaceRepoStub, 'execute')
    await sut.perform(makeFakeSaveUserPreferenceGamePlaceData())
    expect(executeSpy).toHaveBeenCalledWith({
      id: 'any_id',
      online: true,
      inPerson: false
    })
  })

  it('Should throw if SaveUserPreferenceGamePlaceRepo throws', async () => {
    const { sut, saveUserPreferenceGamePlaceRepoStub } = makeSut()
    jest.spyOn(saveUserPreferenceGamePlaceRepoStub, 'execute').mockReturnValueOnce(
      Promise.reject(new Error())
    )
    const promise = sut.perform(makeFakeSaveUserPreferenceGamePlaceData())
    await expect(promise).rejects.toThrow()
  })

  it('Should return right result on success', async () => {
    const { sut } = makeSut()
    const result = await sut.perform(makeFakeSaveUserPreferenceGamePlaceData())
    expect(result.isRight()).toBe(true)
  })
})

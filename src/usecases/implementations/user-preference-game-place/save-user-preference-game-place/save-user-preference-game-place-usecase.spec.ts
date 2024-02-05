import { NonExistentUserPreferenceError } from '@/domain/errors'
import type { PreferenceModel, UserPreferenceGamePlaceModel } from '@/domain/models'
import { type FindPreferenceByIdRepo } from '@/usecases/contracts/db/user'
import { type SaveUserPreferenceGamePlaceRepo } from '@/usecases/contracts/db/user-preference-game-place'
import { SaveUserPreferenceGamePlaceUsecase } from './save-user-preference-game-place-usecase'
import { type SaveUserPreferenceGamePlaceData } from '@/domain/contracts/user-preference-game-place'

const makeFakeSaveUserPreferenceGamePlaceData = (): SaveUserPreferenceGamePlaceData => ({
  userId: 'any_id',
  online: true,
  inPerson: false
})

const makeFakePreferenceModel = (): PreferenceModel => ({
  id: 'any_id',
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
  findPreferenceByIdRepoStub: FindPreferenceByIdRepo
  saveUserPreferenceGamePlaceRepoStub: SaveUserPreferenceGamePlaceRepo
}

const makeSut = (): SutTypes => {
  const findPreferenceByIdRepoStub = makeFindPreferenceByIdRepo()
  const saveUserPreferenceGamePlaceRepoStub = makeSaveUserPreferenceGamePlaceRepo()
  const sut = new SaveUserPreferenceGamePlaceUsecase(
    findPreferenceByIdRepoStub, saveUserPreferenceGamePlaceRepoStub
  )
  return { sut, findPreferenceByIdRepoStub, saveUserPreferenceGamePlaceRepoStub }
}

describe('SaveUserPreferenceGamePlaceUsecase', () => {
  it('Should call FindPreferenceByIdRepo with correct values', async () => {
    const { sut, findPreferenceByIdRepoStub } = makeSut()
    const executeSpy = jest.spyOn(findPreferenceByIdRepoStub, 'execute')
    await sut.perform(makeFakeSaveUserPreferenceGamePlaceData())
    expect(executeSpy).toHaveBeenCalledWith('any_id')
  })

  it('Should return NonExistentUserPreferencesError if FindPreferenceByIdRepo returns null', async () => {
    const { sut, findPreferenceByIdRepoStub } = makeSut()
    jest.spyOn(findPreferenceByIdRepoStub, 'execute').mockReturnValueOnce(
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

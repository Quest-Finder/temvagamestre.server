import { type AddGamePlaceData } from '@/domain/contracts/user'
import type { GamePlaceModel, PreferenceModel } from '@/domain/models'
import { type FindPreferenceByIdRepo } from '@/usecases/contracts/db/user'
import { type AddOrUpdateGamePlaceRepo } from '@/usecases/contracts/db/user/add-or-update-game-place-repo'
import { AddGamePlaceUsecase } from './add-game-place-usecase'
import { NonExistentUserPreferenceError } from '@/domain/errors'

const makeFakeGamePlaceModel = (): GamePlaceModel => ({
  id: 'any_user_id',
  online: true,
  inPerson: false
})

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

const makeAddOrUpdateGamePlaceRepo = (): AddOrUpdateGamePlaceRepo => {
  class AddOrUpdateGamePlaceRepoStub implements AddOrUpdateGamePlaceRepo {
    async execute (data: AddGamePlaceData): Promise<void> {
      await Promise.resolve()
    }
  }
  return new AddOrUpdateGamePlaceRepoStub()
}

type SutTypes = {
  sut: AddGamePlaceUsecase
  addOrUpdateGamePlaceRepoStub: AddOrUpdateGamePlaceRepo
  findPreferenceByIdRepoStub: FindPreferenceByIdRepo
}

const makeSut = (): SutTypes => {
  const findPreferenceByIdRepoStub = makeFindPreferenceByIdRepo()
  const addOrUpdateGamePlaceRepoStub = makeAddOrUpdateGamePlaceRepo()
  const sut = new AddGamePlaceUsecase(findPreferenceByIdRepoStub, addOrUpdateGamePlaceRepoStub)
  return {
    sut,
    addOrUpdateGamePlaceRepoStub,
    findPreferenceByIdRepoStub
  }
}

describe('AddGamePlaceUsecase', () => {
  it('Should call FindPreferenceByIdRepo with correct values', async () => {
    const { sut, findPreferenceByIdRepoStub } = makeSut()
    const executeSpy = jest.spyOn(findPreferenceByIdRepoStub, 'execute')
    await sut.perform(makeFakeGamePlaceModel())
    expect(executeSpy).toHaveBeenCalledWith('any_user_id')
  })

  it('Should return NonExistentUserPreferencesError if FindPreferenceByIdRepo returns null', async () => {
    const { sut, findPreferenceByIdRepoStub } = makeSut()
    jest.spyOn(findPreferenceByIdRepoStub, 'execute').mockReturnValueOnce(Promise.resolve(null))
    const result = await sut.perform(makeFakeGamePlaceModel())
    expect(result.value).toEqual(new NonExistentUserPreferenceError('any_user_id'))
  })

  it('Should call AddOrUpdateGamePlaceRepo with correct values', async () => {
    const { sut, addOrUpdateGamePlaceRepoStub } = makeSut()
    const executeSpy = jest.spyOn(addOrUpdateGamePlaceRepoStub, 'execute')
    await sut.perform(makeFakeGamePlaceModel())
    expect(executeSpy).toHaveBeenCalledWith(makeFakeGamePlaceModel())
  })
})

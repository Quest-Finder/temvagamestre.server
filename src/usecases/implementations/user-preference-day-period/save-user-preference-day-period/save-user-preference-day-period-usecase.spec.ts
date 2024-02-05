import type { UserPreferenceDayPeriodModel, PreferenceModel } from '@/domain/models'
import { SaveUserPreferenceDayPeriodUsecase } from './save-user-preference-day-period-usecase'
import { NonExistentUserPreferenceError } from '@/domain/errors'
import type { SaveUserPreferenceDayPeriodData } from '@/domain/contracts/user-preference-day-period'
import type { FindPreferenceByIdRepo } from '@/usecases/contracts/db/user'
import type { SaveUserPreferenceDayPeriodRepo } from '@/usecases/contracts/db/user-preference-day-period'

const makeFakeSaveUserPreferenceDayPeriodData = (): SaveUserPreferenceDayPeriodData => ({
  userId: 'any_user_id',
  morning: true,
  afternoon: false,
  night: false
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

const makeSaveUserPreferenceDayPeriodRepo = (): SaveUserPreferenceDayPeriodRepo => {
  class SaveUserPreferenceDayPeriodRepoStub implements SaveUserPreferenceDayPeriodRepo {
    async execute (data: UserPreferenceDayPeriodModel): Promise<void> {
      await Promise.resolve()
    }
  }
  return new SaveUserPreferenceDayPeriodRepoStub()
}

type SutTypes = {
  sut: SaveUserPreferenceDayPeriodUsecase
  findPreferenceByIdRepoStub: FindPreferenceByIdRepo
  saveUserPreferenceDayPeriodRepoStub: SaveUserPreferenceDayPeriodRepo
}

const makeSut = (): SutTypes => {
  const findPreferenceByIdRepoStub = makeFindPreferenceByIdRepo()
  const saveUserPreferenceDayPeriodRepoStub = makeSaveUserPreferenceDayPeriodRepo()
  const sut = new SaveUserPreferenceDayPeriodUsecase(findPreferenceByIdRepoStub, saveUserPreferenceDayPeriodRepoStub)
  return { sut, findPreferenceByIdRepoStub, saveUserPreferenceDayPeriodRepoStub }
}

describe('SaveUserPreferenceDayPeriodUsecase', () => {
  it('Should call FindPreferenceByIdRepo with correct values', async () => {
    const { sut, findPreferenceByIdRepoStub } = makeSut()
    const executeSpy = jest.spyOn(findPreferenceByIdRepoStub, 'execute')
    await sut.perform(makeFakeSaveUserPreferenceDayPeriodData())
    expect(executeSpy).toHaveBeenCalledWith('any_user_id')
  })

  it('Should return NonExistentUserPreferencesError if FindPreferenceByIdRepo does not returns a preference', async () => {
    const { sut, findPreferenceByIdRepoStub } = makeSut()
    jest.spyOn(findPreferenceByIdRepoStub, 'execute').mockReturnValueOnce(
      Promise.resolve(null)
    )
    const result = await sut.perform(makeFakeSaveUserPreferenceDayPeriodData())
    expect(result.value).toEqual(new NonExistentUserPreferenceError('any_user_id'))
  })

  it('Should call SaveUserPreferenceDayPeriodRepo with correct values', async () => {
    const { sut, saveUserPreferenceDayPeriodRepoStub } = makeSut()
    const executeSpy = jest.spyOn(saveUserPreferenceDayPeriodRepoStub, 'execute')
    await sut.perform(makeFakeSaveUserPreferenceDayPeriodData())
    const { userId: id, ...otherData } = makeFakeSaveUserPreferenceDayPeriodData()
    expect(executeSpy).toHaveBeenCalledWith({ id, ...otherData })
  })

  it('Should throw if SaveUserPreferenceDayPeriodRepo throws', async () => {
    const { sut, saveUserPreferenceDayPeriodRepoStub } = makeSut()
    jest.spyOn(saveUserPreferenceDayPeriodRepoStub, 'execute').mockReturnValueOnce(
      Promise.reject(new Error())
    )
    const promise = sut.perform(makeFakeSaveUserPreferenceDayPeriodData())
    await expect(promise).rejects.toThrow()
  })

  it('Should return right result on success', async () => {
    const { sut } = makeSut()
    const result = await sut.perform(makeFakeSaveUserPreferenceDayPeriodData())
    expect(result.isRight()).toBe(true)
  })
})

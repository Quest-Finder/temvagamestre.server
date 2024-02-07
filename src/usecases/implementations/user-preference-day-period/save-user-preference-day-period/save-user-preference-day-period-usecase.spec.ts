import type { UserPreferenceDayPeriodModel, UserPreferenceModel } from '@/domain/models'
import { SaveUserPreferenceDayPeriodUsecase } from './save-user-preference-day-period-usecase'
import { NonExistentUserPreferenceError } from '@/domain/errors'
import type { SaveUserPreferenceDayPeriodData } from '@/domain/contracts/user-preference-day-period'
import type { SaveUserPreferenceDayPeriodRepo } from '@/usecases/contracts/db/user-preference-day-period'
import type { FindUserPreferenceByIdRepo } from '@/usecases/contracts/db/user-preference'

const makeFakeSaveUserPreferenceDayPeriodData = (): SaveUserPreferenceDayPeriodData => ({
  userId: 'any_user_id',
  morning: true,
  afternoon: false,
  night: false
})

const makeFakeUserPreferenceModel = (): UserPreferenceModel => ({
  id: 'any_user_id',
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
  findUserPreferenceByIdRepoStub: FindUserPreferenceByIdRepo
  saveUserPreferenceDayPeriodRepoStub: SaveUserPreferenceDayPeriodRepo
}

const makeSut = (): SutTypes => {
  const findUserPreferenceByIdRepoStub = makeFindUserPreferenceByIdRepo()
  const saveUserPreferenceDayPeriodRepoStub = makeSaveUserPreferenceDayPeriodRepo()
  const sut = new SaveUserPreferenceDayPeriodUsecase(findUserPreferenceByIdRepoStub, saveUserPreferenceDayPeriodRepoStub)
  return { sut, findUserPreferenceByIdRepoStub, saveUserPreferenceDayPeriodRepoStub }
}

describe('SaveUserPreferenceDayPeriodUsecase', () => {
  it('Should call FindUserPreferenceByIdRepo with correct values', async () => {
    const { sut, findUserPreferenceByIdRepoStub } = makeSut()
    const executeSpy = jest.spyOn(findUserPreferenceByIdRepoStub, 'execute')
    await sut.perform(makeFakeSaveUserPreferenceDayPeriodData())
    expect(executeSpy).toHaveBeenCalledWith('any_user_id')
  })

  it('Should return NonExistentUserPreferencesError if FindUserPreferenceByIdRepo does not returns a preference', async () => {
    const { sut, findUserPreferenceByIdRepoStub } = makeSut()
    jest.spyOn(findUserPreferenceByIdRepoStub, 'execute').mockReturnValueOnce(
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

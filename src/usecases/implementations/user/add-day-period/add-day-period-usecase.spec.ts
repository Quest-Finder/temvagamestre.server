import { type AddDayPeriodData } from '@/domain/contracts/user'
import { type PreferenceModel } from '@/domain/models'
import { type DayPeriodModel } from '@/domain/models/day-period/day-period-model'
import { type AddOrUpdateDayPeriodRepo, type FindPreferenceByIdRepo } from '@/usecases/contracts/db/user'
import { AddDayPeriodUsecase } from './add-day-period-usecase'
import { NonExistentUserPreferenceError } from '@/domain/errors'

const makeFakeDayPeriodModel = (): DayPeriodModel => ({
  id: 'any_user_id',
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

const makeAddOrUpdateDayPeriodRepo = (): AddOrUpdateDayPeriodRepo => {
  class AddOrUpdateDayPeriodRepoStub implements AddOrUpdateDayPeriodRepo {
    async execute (data: AddDayPeriodData): Promise<void> {
      await Promise.resolve()
    }
  }
  return new AddOrUpdateDayPeriodRepoStub()
}

type SutTypes = {
  sut: AddDayPeriodUsecase
  findPreferenceByIdRepoStub: FindPreferenceByIdRepo
  addOrUpdateDayPeriodRepoStub: AddOrUpdateDayPeriodRepo
}

const makeSut = (): SutTypes => {
  const findPreferenceByIdRepoStub = makeFindPreferenceByIdRepo()
  const addOrUpdateDayPeriodRepoStub = makeAddOrUpdateDayPeriodRepo()
  const sut = new AddDayPeriodUsecase(findPreferenceByIdRepoStub, addOrUpdateDayPeriodRepoStub)

  return {
    findPreferenceByIdRepoStub,
    addOrUpdateDayPeriodRepoStub,
    sut
  }
}

describe('AddDayPeriodUsecase', () => {
  it('Should call FindPreferenceByIdRepo with correct values', async () => {
    const { sut, findPreferenceByIdRepoStub } = makeSut()
    const executeSpy = jest.spyOn(findPreferenceByIdRepoStub, 'execute')
    await sut.perform(makeFakeDayPeriodModel())
    expect(executeSpy).toHaveBeenCalledWith('any_user_id')
  })

  it('Should return NonExistentUserPreferencesError if FindPreferenceByIdRepo does not returns a preference', async () => {
    const { sut, findPreferenceByIdRepoStub } = makeSut()
    jest.spyOn(findPreferenceByIdRepoStub, 'execute').mockReturnValueOnce(Promise.resolve(null))
    const result = await sut.perform(makeFakeDayPeriodModel())
    expect(result.value).toEqual(new NonExistentUserPreferenceError('any_user_id'))
  })
})

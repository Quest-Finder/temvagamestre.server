import { AppException } from '@/shared/exceptions/app-exception'
import { type UserPreferenceDayPeriodModel } from '@/users/repository/entity/user-preference-day-period.model'
import { type UserPreferenceModel } from '@/users/repository/entity/user-preference.model'
import { UserPreferenceDayPeriodRepository } from '@/users/repository/user-preference-day-period/user-preference-day-period-repository'
import { UserPreferenceRepository } from '@/users/repository/user-preference/user-preference.repository'
import { Test, type TestingModule } from '@nestjs/testing'
import { UserPreferenceDayPeriodService, type SaveUserPreferenceDayPeriodServiceInput } from './user-preference-day-period.service'

const makeFakeUsePreferenceModel = (): UserPreferenceModel => {
  return {
    id: 'valid-user-id',
    activeType: 'player',
    frequency: 'monthly'
  }
}

const makeInput = (): SaveUserPreferenceDayPeriodServiceInput => {
  return {
    userId: 'valid-user-id',
    afternoon: true,
    morning: false,
    night: true
  }
}

const makeUserPreferenceDayPeriod = (): UserPreferenceDayPeriodModel => {
  return {
    id: makeInput().userId,
    afternoon: true,
    morning: false,
    night: true
  }
}

class MockUserPreferenceDayPeriodRepository {
  async save (data: UserPreferenceDayPeriodModel): Promise<UserPreferenceDayPeriodModel | undefined> {
    return makeUserPreferenceDayPeriod()
  }
}

class MockUserPreferenceRepository {
  async findById (id: string): Promise<UserPreferenceModel | undefined> {
    return makeFakeUsePreferenceModel()
  }
}

describe('UserPreferenceDayPeriodService', () => {
  let service: UserPreferenceDayPeriodService
  let userPreferenceRepository: UserPreferenceRepository
  let userPreferenceDayPeriodRepository: UserPreferenceDayPeriodRepository
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserPreferenceDayPeriodService,
        {
          provide: UserPreferenceRepository,
          useClass: MockUserPreferenceRepository
        },
        {
          provide: UserPreferenceDayPeriodRepository,
          useClass: MockUserPreferenceDayPeriodRepository
        }
      ]
    }).compile()

    service = module.get<UserPreferenceDayPeriodService>(UserPreferenceDayPeriodService)
    userPreferenceRepository = module.get<UserPreferenceRepository>(UserPreferenceRepository)
    userPreferenceDayPeriodRepository = module.get<UserPreferenceDayPeriodRepository>(UserPreferenceDayPeriodRepository)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('Save a User Preference Day Period', () => {
    it('should throws if user Preference not found', async () => {
      jest.spyOn(userPreferenceRepository, 'findById').mockResolvedValueOnce(undefined)
      const result = service.save(makeInput())
      await expect(result).rejects.toThrow(new AppException('User preference not found'))
    })

    it('should call user preference day period repository save with correct values', async () => {
      const userPreferenceDayPeriodRepositorySpy = jest.spyOn(userPreferenceDayPeriodRepository, 'save')
      await service.save(makeInput())
      expect(userPreferenceDayPeriodRepositorySpy).toHaveBeenCalledWith(makeUserPreferenceDayPeriod())
    })
  })
})

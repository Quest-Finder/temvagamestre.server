import { type UserPreferenceModel } from '@/users/repository/entity/user-preference.model'
import { UserPreferenceRepository } from '@/users/repository/user-preference/user-preference.repository'
import { Test, type TestingModule } from '@nestjs/testing'
import { UserPreferenceService, type UserPreferenceServiceInput } from './user-preference.service'

const makeInputUserPreference = (): UserPreferenceServiceInput => {
  return {
    userId: 'valid-user-id',
    activeType: 'player',
    frequency: 'monthly'
  }
}
const makeFakeUsePreferenceModel = (): UserPreferenceModel => {
  return {
    id: 'valid-user-id',
    activeType: 'player',
    frequency: 'monthly'
  }
}

const makeFakeUsePreferenceModelUpdate = (): UserPreferenceModel => {
  return {
    id: 'valid-user-id',
    activeType: 'gameMaster',
    frequency: 'monthly'
  }
}

class MockUserPreferenceRepository {
  async save (userPreference: UserPreferenceModel): Promise<UserPreferenceModel | undefined> {
    return makeFakeUsePreferenceModel()
  }

  async findById (id: string): Promise<UserPreferenceModel | undefined> {
    return makeFakeUsePreferenceModel()
  }

  async update ({ id, activeType, frequency }: UserPreferenceModel): Promise<UserPreferenceModel> {
    return makeFakeUsePreferenceModelUpdate()
  }
}

describe('UserPreferenceService', () => {
  let service: UserPreferenceService
  let userPreferenceRepository: UserPreferenceRepository
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserPreferenceService,
        {
          provide: UserPreferenceRepository,
          useClass: MockUserPreferenceRepository
        }

      ]
    }).compile()

    service = module.get<UserPreferenceService>(UserPreferenceService)
    userPreferenceRepository = module.get<UserPreferenceRepository>(UserPreferenceRepository)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('Save a new user preference', () => {
    it('should throws if user preference exits', async () => {
      const { userId, activeType, frequency } = makeInputUserPreference()
      const result = service.save({
        userId,
        activeType,
        frequency
      })
      await expect(result).rejects.toThrow(new Error('User preference already exits'))
    })

    it('should call save method repository ', async () => {
      const { userId, activeType, frequency } = makeInputUserPreference()
      jest.spyOn(userPreferenceRepository, 'findById').mockResolvedValueOnce(undefined)
      const userPreferenceRepositorySpy = jest.spyOn(userPreferenceRepository, 'save')
      await service.save({
        userId,
        activeType,
        frequency
      })
      expect(userPreferenceRepositorySpy).toHaveBeenCalledTimes(1)
    })
  })

  describe('Update a user preference', () => {
    it('should throw if user preference not found', async () => {
      const { userId, activeType, frequency } = makeInputUserPreference()
      jest.spyOn(userPreferenceRepository, 'findById').mockResolvedValueOnce(undefined)
      const result = service.update({
        userId,
        activeType,
        frequency
      })
      await expect(result).rejects.toThrow(new Error('User preference not exits'))
    })

    it('should call update repository with new values', async () => {
      const { userId } = makeInputUserPreference()
      const userPreferenceRepositorySpy = jest.spyOn(userPreferenceRepository, 'update')
      await service.update({
        userId,
        activeType: 'gameMaster',
        frequency: 'weekly'
      })
      expect(userPreferenceRepositorySpy).toHaveBeenCalledWith({
        id: userId,
        activeType: 'gameMaster',
        frequency: 'weekly'
      })
      expect(userPreferenceRepositorySpy).toHaveBeenCalledTimes(1)
    })
  })
})

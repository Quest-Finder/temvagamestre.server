import { type UserPreferenceGamePlaceModel } from '@/users/repository/entity/user-preference-game-place.model'
import { type UserPreferenceModel } from '@/users/repository/entity/user-preference.model'
import { UserPreferenceGamePlaceRepository } from '@/users/repository/user-preference-game-place/user-preference-game-place-repository'
import { UserPreferenceRepository } from '@/users/repository/user-preference/user-preference.repository'
import { Test, type TestingModule } from '@nestjs/testing'
import { type SaveUserPreferenceGameServiceInput, UserPreferenceGamePlaceService } from './user-preference-game-place.service'

const makeFakeUsePreferenceModel = (): UserPreferenceModel => {
  return {
    id: 'valid-user-id',
    activeType: 'player',
    frequency: 'monthly'
  }
}

const makeInput = (): SaveUserPreferenceGameServiceInput => {
  return {
    userId: 'valid-user-id',
    online: true,
    inPerson: false
  }
}

const makeUserPreferenceGamePlace = (): UserPreferenceGamePlaceModel => {
  return {
    id: makeInput().userId,
    online: true,
    inPerson: false
  }
}

class MockUserPreferenceRepository {
  async findById (id: string): Promise<UserPreferenceModel | undefined> {
    return makeFakeUsePreferenceModel()
  }
}

class MockUserPreferenceGamePlaceRepository {
  async save ({ id, inPerson, online }: UserPreferenceGamePlaceModel): Promise<UserPreferenceGamePlaceModel> {
    return makeUserPreferenceGamePlace()
  }
}
describe('UserPreferenceGamePlaceService', () => {
  let service: UserPreferenceGamePlaceService
  let userPreferenceRepository: UserPreferenceRepository
  let userPreferenceGamePlaceRepository: UserPreferenceGamePlaceRepository

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserPreferenceGamePlaceService,
        {
          provide: UserPreferenceRepository,
          useClass: MockUserPreferenceRepository
        },
        {
          provide: UserPreferenceGamePlaceRepository,
          useClass: MockUserPreferenceGamePlaceRepository
        }
      ]
    }).compile()

    service = module.get<UserPreferenceGamePlaceService>(UserPreferenceGamePlaceService)
    userPreferenceRepository = module.get<UserPreferenceRepository>(UserPreferenceRepository)
    userPreferenceGamePlaceRepository = module.get<UserPreferenceGamePlaceRepository>(UserPreferenceGamePlaceRepository)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('Save a User Preference Day Period', () => {
    it('should throws if user Preference not found', async () => {
      jest.spyOn(userPreferenceRepository, 'findById').mockResolvedValueOnce(undefined)
      const result = service.save(makeInput())
      await expect(result).rejects.toThrow(new Error('User preference not found'))
    })

    it('should call user preference day period repository save with correct values', async () => {
      const userPreferenceGamePlaceRepositorySpy = jest.spyOn(userPreferenceGamePlaceRepository, 'save')
      await service.save(makeInput())
      expect(userPreferenceGamePlaceRepositorySpy).toHaveBeenCalledWith(makeUserPreferenceGamePlace())
    })
  })
})

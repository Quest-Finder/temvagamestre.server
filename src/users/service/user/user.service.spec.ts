import { MockIbgeService } from '@/city-state/city-state.service.spec'
import { type CityStateInput, CityStateRepository } from '@/city-state/repository/city-state-repository'
import { CityStateError } from '@/errors'
import { type CityStateModel } from '@/models/city-state'
import { MockPlayerProfileRepository } from '@/player-profile/player-profile.service.spec'
import { PlayersProfileRepository } from '@/player-profile/repository/player-profiles.repository'
import { RpgStylesRepository } from '@/rpg-styles/repository/rpg-styles.repository'
import { MockRpgStyleRepository } from '@/rpg-styles/rpg-styles.service.spec'
import { AppException } from '@/shared/exceptions/app-exception'
import { IbgeService } from '@/shared/integration/ibge/ibge.service'
import { SocialMediaRepository } from '@/social-media/repository/social-media-repository'
import { MockSocialMediaRepository } from '@/social-media/social-media.service.spec'
import { type UserModel } from '@/users/repository/entity/user.model'
import { type UserRegisterRepositoryInput, UserRepository } from '@/users/repository/user/user-repository'
import { Test, type TestingModule } from '@nestjs/testing'
import { type InputUserService, UserService } from './user.service'

const makeRegisterInput = (): InputUserService => {
  return {
    id: 'valid-user-id',
    user: {
      name: 'John doe',
      dateOfBirth: new Date(),
      playerProfileId: 'valid-player-profile-id',
      pronoun: 'he/his',
      rpgStyles: ['valid-rpg-style-id'],
      socialMedias: [{ socialMediaId: 'valid-social-media-id', userLink: '/link-user' }],
      username: 'valid-username',
      bio: 'some bio',
      cityState: {
        city: 'rio de janeiro',
        uf: 'rj',
        lifeInBrazil: true
      },
      title: 'Some title'
    }
  }
}

const makeSession = (): any => {
  return {
    getCityValidationDone: false
  }
}

const makeUser = (): UserModel => {
  return {
    id: 'valid_id',
    name: 'John doe',
    email: 'valid@email.com',
    username: 'valid-usernema'
  }
}

class MockUserRepository {
  async findByUsername (username: string): Promise<UserModel | undefined> {
    return makeUser()
  }

  async register ({ id, rpgStyles, socialMedias, ...rest }: UserRegisterRepositoryInput): Promise<UserModel> {
    return makeUser()
  }
}

class MockCityStateRepository {
  async save ({ city, lifeInBrazil, uf }: CityStateInput): Promise<CityStateModel> {
    return {
      id: 'valid-id',
      city: 'Rio ',
      uf: 'RH',
      lifeInBrazil: true
    }
  }
}

describe('UserService', () => {
  let service: UserService
  let userRepository: UserRepository
  let ibgeService: IbgeService
  let playerProfileRepository: PlayersProfileRepository
  let rpgStyleRepository: RpgStylesRepository
  let socialMediaRepository: SocialMediaRepository
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: UserRepository, useClass: MockUserRepository },
        { provide: IbgeService, useClass: MockIbgeService },
        { provide: CityStateRepository, useClass: MockCityStateRepository },
        { provide: RpgStylesRepository, useClass: MockRpgStyleRepository },
        { provide: SocialMediaRepository, useClass: MockSocialMediaRepository },
        { provide: PlayersProfileRepository, useClass: MockPlayerProfileRepository }

      ]
    }).compile()

    service = module.get<UserService>(UserService)
    userRepository = module.get<UserRepository>(UserRepository)
    ibgeService = module.get<IbgeService>(IbgeService)
    playerProfileRepository = module.get<PlayersProfileRepository>(PlayersProfileRepository)
    rpgStyleRepository = module.get<RpgStylesRepository>(RpgStylesRepository)
    socialMediaRepository = module.get<SocialMediaRepository>(SocialMediaRepository)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('Check Username Available', () => {
    it('should return void if user is available', async () => {
      jest.spyOn(userRepository, 'findByUsername').mockResolvedValueOnce(undefined)
      const userRepositorySpy = jest.spyOn(userRepository, 'findByUsername')
      await service.checkUsernameIsAvailable('available-username')
      expect(userRepositorySpy).toHaveBeenCalledWith('available-username')
    })
    it('should throws user if username exits', async () => {
      const result = service.checkUsernameIsAvailable('unavailable-username')
      await expect(result).rejects.toThrow(new AppException('Username already exists'))
    })
  })

  describe('Register user', () => {
    it('should call igbe service with data', async () => {
      const ibgeServiceSpy = jest.spyOn(ibgeService, 'findCitiesByState')
      await service.registerUser(makeRegisterInput(), makeSession())
      expect(ibgeServiceSpy).toHaveBeenCalledWith({
        city: makeRegisterInput().user.cityState?.city,
        uf: makeRegisterInput().user.cityState?.uf
      })
    })
    it('should not call igbe service', async () => {
      const ibgeServiceSpy = jest.spyOn(ibgeService, 'findCitiesByState')
      await service.registerUser(makeRegisterInput(), { getCityValidationDone: true })
      expect(ibgeServiceSpy).toHaveBeenCalledTimes(0)
    })
    it('should throws if cityFounded is false', async () => {
      jest.spyOn(ibgeService, 'findCitiesByState').mockResolvedValueOnce({
        cities: [],
        cityFounded: false
      })
      const result = service.registerUser(makeRegisterInput(), makeSession())
      await expect(result).rejects.toThrow(new CityStateError())
    })

    it('should throws if playerProfileId does not exits', async () => {
      jest.spyOn(playerProfileRepository, 'findById').mockResolvedValueOnce(undefined)
      const result = service.registerUser(makeRegisterInput(), makeSession())
      await expect(result).rejects.toThrow(new AppException(`Player Profile with id: ${makeRegisterInput().user.playerProfileId} not found`))
    })

    it('should throws if any rpgStyle does not exits', async () => {
      jest.spyOn(rpgStyleRepository, 'findById').mockResolvedValueOnce(undefined)
      const result = service.registerUser(makeRegisterInput(), makeSession())
      await expect(result).rejects.toThrow(new AppException(`Rgp Style with id: ${makeRegisterInput().user.rpgStyles[0]} not found`))
    })

    it('should throws if any socialMedia does not exits', async () => {
      const socialMediaId = 'valid-social-media-id'
      jest.spyOn(socialMediaRepository, 'findById').mockResolvedValueOnce(undefined)
      const result = service.registerUser(makeRegisterInput(), makeSession())
      await expect(result).rejects.toThrow(new AppException(`Social media with id: ${socialMediaId} not found`))
    })

    it('should call user repository register with correct data', async () => {
      const { cityState, dateOfBirth, ...rest } = makeRegisterInput().user
      const userRepositorySpy = jest.spyOn(userRepository, 'register')
      await service.registerUser(makeRegisterInput(), makeSession())
      expect(userRepositorySpy).toHaveBeenCalledWith(expect.objectContaining(rest))
    })
  })
})

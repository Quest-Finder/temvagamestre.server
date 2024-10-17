import { PrismaService } from '@/shared/prisma/prisma.service'
import { Test, type TestingModule } from '@nestjs/testing'
import { type UserPreferenceGamePlaceModel } from '../entity/user-preference-game-place.model'
import { type UserPreferenceModel } from '../entity/user-preference.model'
import { type UserModel } from '../entity/user.model'
import { UserPreferenceGamePlaceRepository } from './user-preference-game-place-repository'

const makeUser = (): UserModel => {
  return {
    id: 'valid-user-id',
    email: 'valid@email.com',
    name: 'John doe'
  }
}

const makeUserPreference = (): UserPreferenceModel => {
  return {
    id: makeUser().id,
    activeType: 'gameMaster',
    frequency: 'daily'
  }
}

const makeInput = (): UserPreferenceGamePlaceModel => {
  return {
    id: 'valid-user-id',
    inPerson: true,
    online: false
  }
}

describe('UserPreferenceGamePlaceRepository', () => {
  let repository: UserPreferenceGamePlaceRepository
  let prismaService: PrismaService
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserPreferenceGamePlaceRepository, PrismaService]
    }).compile()
    repository = module.get<UserPreferenceGamePlaceRepository>(UserPreferenceGamePlaceRepository)
    prismaService = module.get<PrismaService>(PrismaService)
  })

  beforeEach(async () => {
    await prismaService.userPreferenceRpgStyle.deleteMany()
    await prismaService.userPreferenceDayPeriod.deleteMany()
    await prismaService.userPreferenceGamePlace.deleteMany()
    await prismaService.userPreferencePlayersRange.deleteMany()
    await prismaService.externalAuthMapping.deleteMany()
    await prismaService.userPreference.deleteMany()
    await prismaService.userSocialMedia.deleteMany()
    await prismaService.userConfig.deleteMany()
    await prismaService.userBadge.deleteMany()
    await prismaService.user.deleteMany()
    await prismaService.address.deleteMany()
    await prismaService.cityState.deleteMany()
    await prismaService.userWithEmail.deleteMany()
    await prismaService.playerProfile.deleteMany()
    await prismaService.rpgStyle.deleteMany()
    await prismaService.badge.deleteMany()
    await prismaService.socialMedia.deleteMany()
  })

  afterAll(async () => {
    await prismaService.$disconnect()
  })

  it('should be defined', () => {
    expect(repository).toBeDefined()
  })

  describe('Save a User Preference Game Place', () => {
    it('should save a new user preference game place', async () => {
      await prismaService.user.create({ data: makeUser() })
      await prismaService.userPreference.create({ data: makeUserPreference() })

      const result = await repository.save(makeInput())
      expect(result).toEqual(expect.objectContaining(makeInput()))
      const createdGamePlace = await prismaService.userPreferenceGamePlace.findUnique({ where: { id: makeInput().id } })
      expect(createdGamePlace).toEqual(expect.objectContaining(makeInput()))
    })
  })
})

import { PrismaService } from '@/shared/prisma/prisma.service'
import { Test, type TestingModule } from '@nestjs/testing'
import { type UserPreferenceDayPeriodModel } from '../entity/user-preference-day-period.model'
import { type UserPreferenceModel } from '../entity/user-preference.model'
import { type UserModel } from '../entity/user.model'
import { UserPreferenceDayPeriodRepository } from './user-preference-day-period-repository'

const makeUser = (): UserModel => {
  return {
    id: 'user-id',
    email: 'valid@email',
    name: 'John Doe'
  }
}

const makeUserPreference = (): UserPreferenceModel => {
  return {
    id: makeUser().id,
    activeType: 'gameMaster',
    frequency: 'daily'
  }
}

const makeInput = (): UserPreferenceDayPeriodModel => {
  return {
    id: makeUser().id,
    afternoon: true,
    morning: true,
    night: false
  }
}

describe('UserPreferenceDayPeriodRepository', () => {
  let repository: UserPreferenceDayPeriodRepository
  let prismaService: PrismaService
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserPreferenceDayPeriodRepository, PrismaService]
    }).compile()

    repository = module.get<UserPreferenceDayPeriodRepository>(UserPreferenceDayPeriodRepository)
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

  describe('Save User Preference Day Period', () => {
    it('should save  a user preference day period', async () => {
      await prismaService.user.create({ data: makeUser() })
      await prismaService.userPreference.create({ data: makeUserPreference() })
      const result = await repository.save(makeInput())
      expect(result).toEqual(expect.objectContaining(makeInput()))
      const resultDataBase = await prismaService.userPreferenceDayPeriod.findUnique({
        where: {
          id: makeUser().id
        }
      })
      expect(resultDataBase).toEqual(expect.objectContaining(makeInput()))
    })
  })
})

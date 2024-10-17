import { PrismaService } from '@/shared/prisma/prisma.service'
import { Test, type TestingModule } from '@nestjs/testing'
import { CityStateRepository } from './city-state-repository'

describe('CityStateService', () => {
  let repository: CityStateRepository
  let prismaService: PrismaService
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CityStateRepository, PrismaService]
    }).compile()
    repository = module.get<CityStateRepository>(CityStateRepository)
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

  describe('Save a City State', () => {
    it('should create a city state', async () => {
      const result = await repository.save({
        lifeInBrazil: true,
        city: 'Rio de janeiro',
        uf: 'RJ'
      })
      expect(result).toEqual(expect.objectContaining({
        lifeInBrazil: true,
        city: 'Rio de janeiro',
        uf: 'RJ'
      }))
    })
  })
})

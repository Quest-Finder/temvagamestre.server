import { PrismaService } from '@/shared/prisma/prisma.service'
import { Test, type TestingModule } from '@nestjs/testing'
import { type SocialMediaModel } from './entities/social-media.model'
import { SocialMediaRepository } from './social-media-repository'

const makeFakeSocialMediaData = (): SocialMediaModel[] => {
  return [
    { id: 'fake-id-1', name: 'Social Media 1', baseUri: 'base-url-social-media-1' },
    { id: 'fake-id-2', name: 'Social Media 2', baseUri: 'base-url-social-media-2' },
    { id: 'fake-id-3', name: 'Social Media 3', baseUri: 'base-url-social-media-3' }
  ]
}

describe('SocialMediaRepository', () => {
  let repository: SocialMediaRepository
  let prismaService: PrismaService

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SocialMediaRepository, PrismaService]
    }).compile()

    repository = module.get<SocialMediaRepository>(SocialMediaRepository)
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
    expect(prismaService).toBeDefined()
    expect(repository).toBeDefined()
  })

  describe('Find all Social media', () => {
    it('should be return a empty list with social medias', async () => {
      const result = await repository.findAll()
      expect(result.length).toBe(0)
    })
    it('should be return a list with social medias', async () => {
      await prismaService.socialMedia.createMany({
        data: makeFakeSocialMediaData()
      })
      const result = await repository.findAll()
      expect(result.length).toBe(3)
      expect(result).toEqual(expect.arrayContaining([
        expect.objectContaining({ name: 'Social Media 1', baseUri: 'base-url-social-media-1' }),
        expect.objectContaining({ name: 'Social Media 2', baseUri: 'base-url-social-media-2' }),
        expect.objectContaining({ name: 'Social Media 3', baseUri: 'base-url-social-media-3' })
      ]))
    })
  })

  describe('Find Social Media By Id', () => {
    it('should return a undefined value if social media id not exists', async () => {
      const result = await repository.findById('invali-id')
      expect(result).not.toBeTruthy()
    })
    it('should return a social media if social media id exists', async () => {
      await prismaService.socialMedia.createMany({
        data: makeFakeSocialMediaData()
      })
      const result = await repository.findById('fake-id-1')
      expect(result).toEqual(expect.objectContaining(
        { id: 'fake-id-1', name: 'Social Media 1', baseUri: 'base-url-social-media-1' }
      ))
    })
  })
})

import { PrismaService } from '@/shared/prisma/prisma.service'
import { type SocialMediaModel } from '@/social-media/repository/entities/social-media.model'
import { Test, type TestingModule } from '@nestjs/testing'
import { type UserModel } from '../entity/user.model'
import { UserSocialMediaRepository } from './user-social-media-repository'

const makeFakeUserData = (): UserModel => {
  return {
    id: 'valid-id',
    name: 'John doe',
    email: 'Valid email'
  }
}
const makeFakeSocialMedia = (): SocialMediaModel => {
  return {
    id: 'valid-social-media-id',
    name: 'valid-name',
    baseUri: 'https://base.url'
  }
}

describe('UserSocialMediaRepository', () => {
  let repository: UserSocialMediaRepository
  let prismaService: PrismaService
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserSocialMediaRepository, PrismaService]
    }).compile()
    repository = module.get<UserSocialMediaRepository>(UserSocialMediaRepository)
    prismaService = module.get<PrismaService>(PrismaService)
    await prismaService.userPreferenceRpgStyle.deleteMany()
    await prismaService.userPreferenceDayPeriod.deleteMany()
    await prismaService.userPreferenceGamePlace.deleteMany()
    await prismaService.userPreferencePlayersRange.deleteMany()
    await prismaService.externalAuthMapping.deleteMany()
    await prismaService.userSocialMedia.deleteMany()
    await prismaService.userPreference.deleteMany()
    await prismaService.socialMedia.deleteMany()
    await prismaService.user.deleteMany()
  })

  afterAll(async () => {
    await prismaService.$disconnect()
  })

  it('should be defined', () => {
    expect(repository).toBeDefined()
  })

  describe('Save a Social Media Repository', () => {
    it('should create a user social media', async () => {
      await prismaService.user.create({
        data: makeFakeUserData()
      })
      await prismaService.socialMedia.create({
        data: makeFakeSocialMedia()
      })
      const result = await repository.save({
        link: '/social-media',
        socialMediaId: makeFakeSocialMedia().id,
        userId: makeFakeUserData().id
      })

      expect(result).toBeTruthy()
      expect(result).toEqual(expect.objectContaining({
        link: '/social-media',
        socialMediaId: makeFakeSocialMedia().id,
        userId: makeFakeUserData().id
      }))
      const resultDataBase = await prismaService.userSocialMedia.findUnique({
        where: {
          userId_socialMediaId: {
            socialMediaId: makeFakeSocialMedia().id,
            userId: makeFakeUserData().id
          }
        }
      })
      expect(resultDataBase).toEqual(expect.objectContaining({
        link: '/social-media',
        socialMediaId: makeFakeSocialMedia().id,
        userId: makeFakeUserData().id
      }))
    })
  })
})

import { AppModule } from '@/app.module'
import { PrismaService } from '@/shared/prisma/prisma.service'
import { type INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { type SocialMediaModel } from './repository/entities/social-media.model'
let prismaService: PrismaService
let app: INestApplication

const makeFakeSocialMediasModel = (): SocialMediaModel[] => ([{
  id: 'any_social_media_id_1',
  name: 'any_name_1',
  baseUri: 'any1.com/'
}, {
  id: 'any_social_media_id_2',
  name: 'any_name_2',
  baseUri: 'any2.com/'
}])

describe('SocialMediaController', () => {
  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule]
    }).compile()
    prismaService = module.get<PrismaService>(PrismaService)
    app = module.createNestApplication()
    await app.init()
  })

  beforeEach(async () => {
    await prismaService.address.deleteMany()
    await prismaService.cityState.deleteMany()
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
    await prismaService.playerProfile.deleteMany()
    await prismaService.rpgStyle.deleteMany()
    await prismaService.badge.deleteMany()
    await prismaService.socialMedia.deleteMany()
  })

  afterAll(async () => {
    await app.close()
  })

  describe('GET /social-media', () => {
    it('Should return 200 when returns all social medias', async () => {
      await prismaService.socialMedia.createMany({
        data: makeFakeSocialMediasModel()
      })
      const result = await request(app.getHttpServer())
        .get('/social-media')

      expect(result.statusCode).toBe(200)
      expect(result.body).toEqual(expect.arrayContaining(makeFakeSocialMediasModel()
      ))
    })
  })
})

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
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule]
    }).compile()
    app = module.createNestApplication()
    prismaService = module.get<PrismaService>(PrismaService)
    await prismaService.$connect()
    await prismaService.userPreferenceRpgStyle.deleteMany()
    await prismaService.userPreferenceDayPeriod.deleteMany()
    await prismaService.userPreferenceGamePlace.deleteMany()
    await prismaService.userPreferencePlayersRange.deleteMany()
    await prismaService.externalAuthMapping.deleteMany()
    await prismaService.userPreference.deleteMany()
    await prismaService.userSocialMedia.deleteMany()
    await prismaService.socialMedia.deleteMany()
    await prismaService.user.deleteMany()
    await app.init()
  })

  afterEach(async () => {
    await prismaService.$disconnect()
    await app.close()
  })

  describe('GET /social-media', () => {
    it('Should return 200 when returns all social medias', async () => {
      await prismaService.socialMedia.createMany({
        data: makeFakeSocialMediasModel()
      })
      await request(app.getHttpServer())
        .get('/social-media')
        .expect(200)
        .expect((res) => {
          expect(res.body).toEqual(
            makeFakeSocialMediasModel()
          )
        })
    })
  })
})

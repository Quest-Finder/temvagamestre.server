import { AppModule } from '@/app.module'
import { type INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { PrismaService } from '../prisma/prisma.service'

let prismaService: PrismaService
let app: INestApplication

describe('AppExceptionHandlerFilter', () => {
  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule]
    }).compile()
    prismaService = module.get<PrismaService>(PrismaService)
    app = module.createNestApplication()
    await app.init()
  })

  afterEach(async () => {
    await prismaService.address.deleteMany()
    await prismaService.cityState.deleteMany()
    await prismaService.playerProfile.deleteMany()
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
  })

  afterAll(async () => {
    await app.close()
  })

  it('Should return 400 if not body is provided', async () => {
    await request(app.getHttpServer())
      .post('/city-state')
      .send()
      .expect(400)
      .expect((res) => {
        expect(res.body).toEqual(
          expect.objectContaining({
            detail: 'Erro na validação de campos',
            title: 'Bad Request',
            statusCode: 400
          })
        )
      })
  })
})

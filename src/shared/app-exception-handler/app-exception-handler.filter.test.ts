import { AppModule } from '@/app.module'
import { type INestApplication } from '@nestjs/common'
import { getConnectionToken } from '@nestjs/mongoose'
import { Test } from '@nestjs/testing'
import { type Connection } from 'mongoose'
import request from 'supertest'
import { PrismaService } from '../prisma/prisma.service'

let prismaService: PrismaService
let mongoDbConnection: Connection
let app: INestApplication

describe('AppExceptionHandlerFilter', () => {
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule]
    }).compile()
    prismaService = module.get<PrismaService>(PrismaService)
    mongoDbConnection = module.get(getConnectionToken())

    app = module.createNestApplication()
    await prismaService.$connect()
    await prismaService.userPreferenceRpgStyle.deleteMany()
    await prismaService.userPreferenceDayPeriod.deleteMany()
    await prismaService.userPreferenceGamePlace.deleteMany()
    await prismaService.userPreferencePlayersRange.deleteMany()
    await prismaService.externalAuthMapping.deleteMany()
    await prismaService.userPreference.deleteMany()
    await prismaService.userSocialMedia.deleteMany()
    await prismaService.user.deleteMany()
    await prismaService.playerProfile.deleteMany()
    await prismaService.rpgStyle.deleteMany()
    await app.init()
  })

  afterAll(async () => {
    await prismaService.$disconnect()
    await mongoDbConnection.close(true)
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

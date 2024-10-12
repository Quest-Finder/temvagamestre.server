import { AppModule } from '@/app.module'
import { PrismaService } from '@/shared/prisma/prisma.service'
import { type INestApplication } from '@nestjs/common'
import { getConnectionToken } from '@nestjs/mongoose'
import { Test } from '@nestjs/testing'
import { type Connection } from 'mongoose'
import request from 'supertest'

let prismaService: PrismaService
let mongoDbConnection: Connection
let app: INestApplication
describe('FakeUserController', () => {
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
    await app.init()
  })

  afterAll(async () => {
    await prismaService.$disconnect()
    await mongoDbConnection.close(true)
    await app.close()
  })

  describe('Get /fake-user/generate-token', () => {
    it('Should return 200 when adding a fake user', async () => {
      await request(app.getHttpServer())
        .get('/fake-user/generate-token')
        .expect(200)
        .then(response => {
          expect(response.body).toBeTruthy()
        })
    })
  })
})

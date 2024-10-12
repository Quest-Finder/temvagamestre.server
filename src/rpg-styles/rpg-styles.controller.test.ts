import { AppModule } from '@/app.module'
import { PrismaService } from '@/shared/prisma/prisma.service'
import { type INestApplication } from '@nestjs/common'
import { getConnectionToken } from '@nestjs/mongoose'
import { Test } from '@nestjs/testing'
import { type Connection } from 'mongoose'
import request from 'supertest'
import { type RpgStyleModel } from './repository/entities/rpg-style.entity'
const makeFakeRpgStylesModel = (): RpgStyleModel[] => ([{
  id: 'any_rpg_style_id_1',
  name: 'any_name_1'
}, {
  id: 'any_rpg_style_id_2',
  name: 'any_name_2'
}])

let prismaService: PrismaService
let mongoDbConnection: Connection
let app: INestApplication

describe('RpgStylesController', () => {
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

  describe('GET /rpg-style', () => {
    it('Should return 200 when returns all rgp styles', async () => {
      await prismaService.rpgStyle.createMany({
        data: makeFakeRpgStylesModel()
      })
      await request(app.getHttpServer())
        .get('/rpg-style')
        .expect(200)
        .expect((res) => {
          expect(res.body).toEqual(
            makeFakeRpgStylesModel()
          )
        })
    })
  })
})

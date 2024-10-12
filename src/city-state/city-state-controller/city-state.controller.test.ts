/**
 * @jest-environment ./src/infra/database/prisma/schema/custom-environment-jest.ts
*/

import { AppModule } from '@/app.module'
import { PrismaService } from '@/shared/prisma/prisma.service'
import { type INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'

let prismaService: PrismaService
// let mongoDbConnection: Connection
let app: INestApplication

describe('City State Routes', () => {
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule]
    }).compile()
    prismaService = module.get<PrismaService>(PrismaService)
    // mongoDbConnection = module.get(getConnectionToken())

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
    // await mongoDbConnection.close(true)
    await app.close()
  })

  describe('POST /city-state', () => {
    it('Should return 200 if validation success', async () => {
      await request(app.getHttpServer())
        .post('/city-state')
        .send({ uf: 'AC' })
        .expect(200)
        .expect((res) => {
          expect(res.body).toEqual(
            expect.arrayContaining([
              'Acrelândia',
              'Assis Brasil',
              'Brasiléia',
              'Bujari',
              'Capixaba',
              'Cruzeiro do Sul',
              'Epitaciolândia',
              'Feijó',
              'Jordão',
              'Mâncio Lima',
              'Manoel Urbano',
              'Marechal Thaumaturgo',
              'Plácido de Castro',
              'Porto Walter',
              'Rio Branco',
              'Rodrigues Alves',
              'Santa Rosa do Purus',
              'Senador Guiomard',
              'Sena Madureira',
              'Tarauacá',
              'Xapuri',
              'Porto Acre'
            ])
          )
        })
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
})

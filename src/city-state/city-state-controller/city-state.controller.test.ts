/**
 * @jest-environment ./src/infra/database/prisma/schema/custom-environment-jest.ts
*/

import { AppModule } from '@/app.module'
import { type INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import session, { type SessionOptions } from 'express-session'
import request from 'supertest'

const sessionConfig: SessionOptions = {
  secret: 'any_secret_key',
  resave: false,
  saveUninitialized: false
}

let app: INestApplication

describe('City State Routes', () => {
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule]
    }).compile()
    app = module.createNestApplication()
    app.use(session(sessionConfig))
    await app.init()
  })

  afterEach(async () => {
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

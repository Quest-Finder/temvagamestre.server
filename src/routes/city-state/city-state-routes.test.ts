/**
 * @jest-environment ./src/main/configs/db-test/custom-environment-jest.ts
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
          expect(res.body).toEqual([
            'acrelândia', 'assis brasil', 'brasiléia', 'bujari', 'capixaba', 'cruzeiro do sul',
            'epitaciolândia', 'feijó', 'jordão', 'mâncio lima', 'manoel urbano', 'marechal thaumaturgo',
            'plácido de castro', 'porto walter', 'rio branco', 'rodrigues alves', 'santa rosa do purus',
            'senador guiomard', 'sena madureira', 'tarauacá', 'xapuri', 'porto acre'
          ])
        })
    })
  })
})

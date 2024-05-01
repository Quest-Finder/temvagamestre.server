/**
 * @jest-environment ./src/main/configs/db-test/custom-environment-jest.ts
*/

import { AppModule } from '@/main/app.module'
import { type INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'

let app: INestApplication

describe('Rpg Style Routes', () => {
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule]
    }).compile()
    app = module.createNestApplication()
    await app.init()
  })

  afterEach(async () => {
    await app.close()
  })

  describe('POST /city-state', () => {
    it('Should return 204 if validation success', async () => {
      await request(app.getHttpServer())
        .post('/city-state/validate')
        .send({ uf: 'SP', city: 'São Paulo' })
        .expect(204)
        .expect((res) => {
          expect(res.body).toEqual({})
        })
    })
  })
})

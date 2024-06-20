/**
 * @jest-environment ./src/infra/database/prisma/schema/custom-environment-jest.ts
*/

import { PrismaHelper } from '@/infra/database/prisma/helpers'
import { AppModule } from '@/app.module'
import type { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'

let app: INestApplication

describe('User Routes', () => {
  beforeAll(async () => {
    await PrismaHelper.connect()
  })

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

  describe('POST /fake-user/generate-token', () => {
    it('Should return 200 when adding a fake user', async () => {
      await request(app.getHttpServer())
        .get('/fake-user/generate-token')
        .expect(200)
    })
  })
})

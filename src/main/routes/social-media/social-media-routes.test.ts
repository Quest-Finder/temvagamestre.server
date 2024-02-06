/**
 * @jest-environment ./src/main/configs/db-test/custom-environment-jest.ts
 */

import { type SocialMediaModel } from '@/domain/models'
import { PrismaHelper } from '@/infra/db/prisma/helpers'
import { AppModule } from '@/main/app.module'
import type { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import type { PrismaClient } from '@prisma/client'
import request from 'supertest'

const makeFakeSocialMediasModel = (): SocialMediaModel[] => ([{
  id: 'any_social_media_id_1',
  name: 'any_name_1'
}, {
  id: 'any_social_media_id_2',
  name: 'any_name_2'
}])

let prisma: PrismaClient
let app: INestApplication

describe('SocialMedia Routes', () => {
  beforeAll(async () => {
    await PrismaHelper.connect()
    prisma = await PrismaHelper.getPrisma()
  })

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule]
    }).compile()

    app = module.createNestApplication()
    await app.init()
    await prisma.socialMedia.deleteMany()
  })

  afterEach(async () => {
    await app.close()
  })

  afterAll(async () => {
    await PrismaHelper.disconnect()
  })

  describe('GET /social-media', () => {
    it('Should return 200 on success', async () => {
      await prisma.socialMedia.createMany({
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

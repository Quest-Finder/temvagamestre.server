/**
 * @jest-environment ./src/main/configs/db-test/custom-environment-jest.ts
*/

import type { ExternalAuthMappingModel, SocialMediaModel, UserModel } from '@/domain/models'
import { PrismaHelper } from '@/infra/db/prisma/helpers'
import { AppModule } from '@/main/app.module'
import env from '@/main/configs/env'
import type { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import type { PrismaClient } from '@prisma/client'
import jwt from 'jsonwebtoken'
import request from 'supertest'

const makeFakeSocialMediaModel = (): SocialMediaModel => ({
  id: 'any_social_media_id',
  name: 'any_s_m_name'
})

const makeFakeUserModel = (): UserModel => ({
  id: 'any_user_id',
  email: 'any_email@mail.com',
  name: 'John Doe',
  dateOfBirth: new Date()
})

const makeFakeExternalAuthMappingModel = (): ExternalAuthMappingModel => ({
  userId: 'any_user_id',
  externalAuthUserId: 'any_external_auth_user_id'
})

const makeFakeToken = async (): Promise<string> => {
  await prisma.user.create({ data: makeFakeUserModel() })
  await prisma.externalAuthMapping.create({ data: makeFakeExternalAuthMappingModel() })
  const token = jwt.sign({ clerkUserId: 'any_external_auth_user_id' }, env.clerkJwtSecretKey)
  return token
}

let prisma: PrismaClient
let app: INestApplication

describe('UserSocialMedia Routes', () => {
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
  })

  afterEach(async () => {
    await app.close()
  })

  afterAll(async () => {
    await PrismaHelper.disconnect()
  })

  describe('POST /user/social-media', () => {
    it('Should return 204 when adding a Social Media to the User', async () => {
      await prisma.socialMedia.create({ data: makeFakeSocialMediaModel() })
      const token = await makeFakeToken()
      await request(app.getHttpServer())
        .post('/user/social-media')
        .set({ 'x-access-token': token })
        .send({
          socialMediaId: 'any_social_media_id',
          link: 'any_link'
        })
        .expect(204)
    })
  })
})

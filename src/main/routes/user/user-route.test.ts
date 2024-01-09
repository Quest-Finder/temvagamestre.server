/**
 * @jest-environment ./src/main/configs/db-test/custom-environment-jest.ts
 */

import type { ExternalAuthMappingModel, PreferenceModel, SocialMediaModel, UserModel } from '@/domain/models'
import { PrismaHelper } from '@/infra/db/prisma/helpers/prisma-helper'
import { AppModule } from '@/main/app.module'
import env from '@/main/configs/env'
import type { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import type { PrismaClient } from '@prisma/client'
import jwt from 'jsonwebtoken'
import request from 'supertest'

const makeFakePreferenceModel = (): PreferenceModel => ({
  id: 'any_user_id',
  frequency: 'daily',
  activeType: 'gameMaster'
})

const makeFakeSocialMediaModel = (): SocialMediaModel => ({
  id: 'any_social_media_id',
  name: 'any_s_m_name'
})

const makeFakeUserModel = (): UserModel => ({
  id: 'any_user_id',
  email: 'any_email@mail.com',
  lastName: 'any_last_name',
  firstName: 'any_first_name',
  dateOfBirth: new Date()
})

const makeFakeExternalAuthMappingModel = (): ExternalAuthMappingModel => ({
  userId: 'any_user_id',
  externalAuthUserId: 'any_external_auth_user_id'
})

let prisma: PrismaClient
let app: INestApplication

describe('User Routes', () => {
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
    await prisma.user.deleteMany()
    await prisma.externalAuthMapping.deleteMany()
    await prisma.userSocialMedia.deleteMany()
    await prisma.socialMedia.deleteMany()
  })

  afterEach(async () => {
    await app.close()
  })

  afterAll(async () => {
    await PrismaHelper.disconnect()
  })

  describe('POST /user/social-media', () => {
    it('Should return 204 on success', async () => {
      await prisma.socialMedia.create({ data: makeFakeSocialMediaModel() })
      await prisma.user.create({ data: makeFakeUserModel() })
      await prisma.externalAuthMapping.create({ data: makeFakeExternalAuthMappingModel() })
      const token = jwt.sign({ clerkUserId: 'any_external_auth_user_id' }, env.clerkJwtSecretKey)
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

  describe('PUT /user/preference', async () => {
    await prisma.user.create({ data: makeFakeUserModel() })
    await prisma.externalAuthMapping.create({ data: makeFakeExternalAuthMappingModel() })
    const token = jwt.sign({ clerkUserId: 'any_external_auth_user_id' }, env.clerkJwtSecretKey)
    await prisma.preference.create({ data: makeFakePreferenceModel() })

    await request(app.getHttpServer())
      .put('/user/preference')
      .set({ 'x-access-token': token })
      .send({
        activeType: 'gameMaster'
      })
      .expect(204)
  })
})

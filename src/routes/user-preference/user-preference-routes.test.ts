/**
 * @jest-environment ./src/infra/database/prisma/schema/custom-environment-jest.ts
*/

import type { ExternalAuthMappingModel, UserModel, UserPreferenceModel } from '@/models'
import { PrismaHelper } from '@/infra/database/prisma/helpers'
import { AppModule } from '@/app.module'
import env from '@/configs/env'
import type { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import type { PrismaClient } from '@prisma/client'
import jwt from 'jsonwebtoken'
import request from 'supertest'

const makeFakeUserPreferenceModel = (): UserPreferenceModel => ({
  id: 'any_user_id',
  frequency: 'daily',
  activeType: 'gameMaster'
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

describe('UserPreference Routes', () => {
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
    await prisma.externalAuthMapping.deleteMany({})
    await prisma.user.deleteMany({})
    await prisma.userPreference.deleteMany({})
  })

  afterEach(async () => {
    await app.close()
  })

  afterAll(async () => {
    await PrismaHelper.disconnect()
  })

  describe('POST /user/preference', () => {
    it('Should return 204 when adding an user preference', async () => {
      const token = await makeFakeToken()
      await request(app.getHttpServer())
        .post('/user/preference')
        .set({ 'x-access-token': token })
        .send({
          frequency: 'daily',
          activeType: 'gameMaster'
        })
        .expect(204)
    })
  })

  describe('PATCH /user/preference', () => {
    it('Should return 204 when updating an user preference', async () => {
      const token = await makeFakeToken()
      await prisma.userPreference.create({ data: makeFakeUserPreferenceModel() })
      await request(app.getHttpServer())
        .patch('/user/preference')
        .set({ 'x-access-token': token })
        .send({
          frequency: 'monthly',
          activeType: 'player'
        })
        .expect(204)
    })
  })
})

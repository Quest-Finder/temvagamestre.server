/**
 * @jest-environment ./src/main/configs/db-test/custom-environment-jest.ts
*/

import type { ExternalAuthMappingModel, UserModel, UserPreferenceModel } from '@/domain/models'
import { PrismaHelper } from '@/infra/db/prisma/helpers'
import { AppModule } from '@/main/app.module'
import env from '@/main/configs/env'
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
  lastName: 'any_last_name',
  firstName: 'any_first_name',
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
    it('Should return 204 on success', async () => {
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
    it('Should return 204 on success', async () => {
      const token = await makeFakeToken()
      await prisma.userPreference.create({ data: makeFakeUserPreferenceModel() })
      await request(app.getHttpServer())
        .patch('/user/preference')
        .set({ 'x-access-token': token })
        .send({
          activeType: 'gameMaster'
        })
        .expect(204)
    })
  })
})

/**
 * @jest-environment ./src/main/configs/db-test/custom-environment-jest.ts
*/

import type { ExternalAuthMappingModel } from '@/domain/models'
import { PrismaHelper } from '@/infra/db/prisma/helpers'
import { AppModule } from '@/main/app.module'
import env from '@/main/configs/env'
import type { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import type { PrismaClient } from '@prisma/client'
import jwt from 'jsonwebtoken'
import request from 'supertest'

type PartialUser = {
  id: string
  name: string
  email: string
}

const makeFakePartialUser = (): PartialUser => ({
  id: 'any_user_id',
  email: 'any_email@mail.com',
  name: 'any_name'
})

const makeFakeExternalAuthMappingModel = (): ExternalAuthMappingModel => ({
  userId: 'any_user_id',
  externalAuthUserId: 'any_external_auth_user_id'
})

const makeFakeToken = async (): Promise<string> => {
  await prisma.user.create({ data: makeFakePartialUser() })
  await prisma.externalAuthMapping.create({ data: makeFakeExternalAuthMappingModel() })
  const token = jwt.sign({ clerkUserId: 'any_external_auth_user_id' }, env.clerkJwtSecretKey)
  return token
}

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
  })

  afterEach(async () => {
    await app.close()
    await prisma.externalAuthMapping.deleteMany()
    await prisma.user.deleteMany()
  })

  afterAll(async () => {
    await PrismaHelper.disconnect()
  })

  describe('POST /user', () => {
    it('Should return 204 when register an user', async () => {
      const token = await makeFakeToken()
      await request(app.getHttpServer())
        .post('/user')
        .set({ 'x-access-token': token })
        .send({
          name: 'John Doe',
          dateOfBirth: '12-31-2000',
          username: 'valid-username',
          pronoun: 'she/her'
        })
        .expect(204)
    })
    it('Should return 400 when post to /user/check-username and validation fails', async () => {
      const token = await makeFakeToken()
      const response = await request(app.getHttpServer())
        .post('/user/check-username')
        .set({ 'x-access-token': token })
        .send({
          username: 'valid-username-valid-username'
        })
      expect(response.statusCode).toBe(400)
      expect(response.body).toEqual(expect.objectContaining({
        error: 'Validation error: String must contain at most 15 character(s)'
      }))
    })
  })
})

/**
 * @jest-environment ./src/main/configs/db-test/custom-environment-jest.ts
*/

import type { ExternalAuthMappingModel, PlayerProfileModel } from '@/domain/models'
import { PrismaHelper } from '@/infra/db/prisma/helpers'
import { AppModule } from '@/main/app.module'
import env from '@/main/configs/env'
import { type INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import type { PrismaClient } from '@prisma/client'
import session, { type SessionOptions } from 'express-session'
import jwt from 'jsonwebtoken'
import request from 'supertest'

const sessionConfig: SessionOptions = {
  secret: 'any_secret_key',
  resave: false,
  saveUninitialized: false
}

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
const makeFakePlayerProfile = (): PlayerProfileModel => ({
  id: '9228a9a0-c7e0-4d62-80bb-458dd772c4f9',
  name: 'any_player_profile_name',
  description: 'any_player_profile_description'
})

let prisma: PrismaClient
let app: INestApplication

describe('User Routes', () => {
  beforeAll(async () => {
    await PrismaHelper.connect()
    prisma = await PrismaHelper.getPrisma()
    await prisma.playerProfile.create({ data: makeFakePlayerProfile() })
    await prisma.rpgStyle.create({ data: { id: 'b866459b-63fc-4bd3-a88c-f6d4a7f39cd2', name: 'any_rpg_style' } })
  })

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
        .set({ 'x-access-token': token, userId: 'any_user_id' })
        .send({
          name: 'John Doe',
          dateOfBirth: '12-31-2000',
          username: 'valid-username',
          pronoun: 'she/her',
          playerProfileId: '9228a9a0-c7e0-4d62-80bb-458dd772c4f9',
          rpgStyles: ['b866459b-63fc-4bd3-a88c-f6d4a7f39cd2'],
          cityState: { uf: 'BA', city: 'Salvador' }
        })
        .expect(204)
    })

    it('Should return 400 when post to /user/check-username and validation fails', async () => {
      const token = await makeFakeToken()
      const response = await request(app.getHttpServer())
        .get('/user/check-username/valid-username-valid-username')
        .set({ 'x-access-token': token })
      expect(response.statusCode).toBe(400)
      expect(response.body).toEqual(expect.objectContaining({
        error: 'Validation error: String must contain at most 15 character(s)'
      }))
    })

    it('Should return 400 when post to /user/check-username username not exits', async () => {
      const token = await makeFakeToken()
      const response = await request(app.getHttpServer())
        .get('/user/check-username/free-username')
        .set({ 'x-access-token': token })

      expect(response.statusCode).toBe(404)
      expect(response.body).toEqual(expect.objectContaining({
        error: 'Username not exists'
      }))
    })

    it('Should return 200 when post to /user/check-username username exits', async () => {
      await prisma.user.create({
        data: {
          id: 'any_user_id_2',
          email: 'any_email_valid@mail.com',
          name: 'any_name',
          username: 'valid-username'
        }
      })

      const token = await makeFakeToken()
      const response = await request(app.getHttpServer())
        .get('/user/check-username/valid-username')
        .set({ 'x-access-token': token })

      expect(response.statusCode).toBe(200)
      expect(response.body).toEqual('Username already exists')
    })
  })
})

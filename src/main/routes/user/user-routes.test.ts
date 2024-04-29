/**
 * @jest-environment ./src/main/configs/db-test/custom-environment-jest.ts
*/

import type { ExternalAuthMappingModel, PlayerProfileModel } from '@/domain/models'
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
    await app.init()
  })

  afterEach(async () => {
    await app.close()
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
          rpgStyles: ['b866459b-63fc-4bd3-a88c-f6d4a7f39cd2']
        })
        .expect(204)
    })
  })
})

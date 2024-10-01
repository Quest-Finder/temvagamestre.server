import { Test } from '@nestjs/testing'

/**
 * @jest-environment ./src/infra/database/prisma/schema/custom-environment-jest.ts
*/

import { AppModule } from '@/app.module'
import env from '@/configs/env'
import { type ExternalAuthMappingModel } from '@/models'
import { PrismaService } from '@/shared/prisma/prisma.service'
import { type SocialMediaModel } from '@/social-media/repository/entities/social-media.model'
import type { INestApplication } from '@nestjs/common'
import jwt from 'jsonwebtoken'
import request from 'supertest'
import { type UserModel } from '../repository/entity/user.model'

const makeFakeSocialMediaModel = (): SocialMediaModel => ({
  id: 'any_id',
  name: 'any_name',
  baseUri: 'socialmedia.com/'
})

const makeFakeUserModel = (): UserModel => ({
  id: 'any_user_id',
  email: 'any_email@mail.com',
  name: 'John Doe',
  dateOfBirth: new Date(),
  externalAuthId: 'any_external_auth_user_id'
})

const makeFakeExternalAuthMappingModel = (): ExternalAuthMappingModel => ({
  userId: 'any_user_id',
  externalAuthUserId: 'any_external_auth_user_id'
})

const makeFakeToken = async (): Promise<string> => {
  await prismaService.user.create({ data: makeFakeUserModel() })
  await prismaService.externalAuthMapping.create({ data: makeFakeExternalAuthMappingModel() })
  const token = jwt.sign({ clerkUserId: 'any_external_auth_user_id' }, env.clerkJwtSecretKey)
  return token
}

let prismaService: PrismaService
let app: INestApplication

describe('UserSocialMedia Routes', () => {
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule]
    }).compile()
    prismaService = module.get<PrismaService>(PrismaService)
    app = module.createNestApplication()
    await prismaService.$connect()
    await prismaService.userSocialMedia.deleteMany()
    await prismaService.socialMedia.deleteMany()
    await prismaService.externalAuthMapping.deleteMany()
    await prismaService.user.deleteMany()
    await app.init()
  })

  afterAll(async () => {
    await prismaService.$disconnect()
    await app.close()
  })

  describe('POST /user/social-media', () => {
    it('Should return 204 when adding a Social Media to the User', async () => {
      await prismaService.socialMedia.create({ data: makeFakeSocialMediaModel() })
      const token = await makeFakeToken()
      await request(app.getHttpServer())
        .post('/user/social-media')
        .set({ 'x-access-token': token })
        .send({
          socialMediaId: 'any_id',
          link: 'any_link'
        })
        .expect(204)
    })
  })
})

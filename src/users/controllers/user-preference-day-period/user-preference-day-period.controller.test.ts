import { AppModule } from '@/app.module'
import env from '@/configs/env'
import { PrismaService } from '@/shared/prisma/prisma.service'
import { type UserPreferenceModel } from '@/users/repository/entity/user-preference.model'
import { type UserModel } from '@/users/repository/entity/user.model'
import { type INestApplication } from '@nestjs/common'
import { getConnectionToken } from '@nestjs/mongoose'
import { Test } from '@nestjs/testing'
import jwt from 'jsonwebtoken'
import { type Connection } from 'mongoose'
import request from 'supertest'
import { type ExternalAuthMappingModel } from '../user/user.controller.spec'

const makeFakeUserPreferenceModel = (): UserPreferenceModel => ({
  id: 'any_user_id',
  frequency: 'daily',
  activeType: 'gameMaster'
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
let mongoDbConnection: Connection
let app: INestApplication

describe('UserPreferenceDayPeriodController', () => {
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule]
    }).compile()
    prismaService = module.get<PrismaService>(PrismaService)
    mongoDbConnection = module.get(getConnectionToken())

    app = module.createNestApplication()
    await prismaService.$connect()
    await prismaService.userPreferenceRpgStyle.deleteMany()
    await prismaService.userPreferenceDayPeriod.deleteMany()
    await prismaService.userPreferenceGamePlace.deleteMany()
    await prismaService.userPreferencePlayersRange.deleteMany()
    await prismaService.externalAuthMapping.deleteMany()
    await prismaService.userPreference.deleteMany()
    await prismaService.userSocialMedia.deleteMany()
    await prismaService.user.deleteMany()
    await prismaService.playerProfile.deleteMany()
    await prismaService.rpgStyle.deleteMany()
    await app.init()
  })

  afterAll(async () => {
    await prismaService.$disconnect()
    await mongoDbConnection.close(true)
    await app.close()
  })

  describe('POST /user/preference/day-period', () => {
    it("Should return 204 when adding a period of the day to the user's preferences", async () => {
      const token = await makeFakeToken()
      await prismaService.userPreference.create({ data: makeFakeUserPreferenceModel() })
      await request(app.getHttpServer())
        .post('/user/preference/day-period')
        .set({ 'x-access-token': token })
        .send({
          morning: true,
          afternoon: false,
          night: false
        })
        .expect(204)
      const userPreferenceDayPeriod = await prismaService.userPreferenceDayPeriod.findUnique({
        where: { id: makeFakeUserPreferenceModel().id }
      })
      expect(userPreferenceDayPeriod).toEqual(expect.objectContaining({
        morning: true,
        afternoon: false,
        night: false,
        id: makeFakeUserPreferenceModel().id
      }))
    })
  })
})

import { AppModule } from '@/app.module'
import env from '@/configs/env'
import { PrismaService } from '@/shared/prisma/prisma.service'
import { type UserModel } from '@/users/repository/entity/user.model'
import type { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import jwt from 'jsonwebtoken'
import request from 'supertest'

let prismaService: PrismaService
// let mongoDbConnection: Connection
let app: INestApplication

export type ExternalAuthMappingModel = {
  userId: string
  externalAuthUserId: string
}

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

const makeUserModel = (): UserModel => ({
  id: 'any_user_id_2',
  email: 'any_email_valid@mail.com',
  name: 'any_name',
  username: 'valid-username'
})

describe('UserController', () => {
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule]
    }).compile()
    prismaService = module.get<PrismaService>(PrismaService)
    // mongoDbConnection = module.get(getConnectionToken())

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
    // await mongoDbConnection.close(true)
    await app.close()
  })

  describe('POST /user/check-username', () => {
    it('Should return 400 when check-username and validation fails', async () => {
      const response = await request(app.getHttpServer())
        .get('/user/check-username/valid-username-valid-username')
      expect(response.statusCode).toBe(400)
      expect(response.body).toEqual(expect.objectContaining({
        detail: 'Erro na validação de campos',
        objects: [
          {
            field: '',
            message: 'String must contain at most 15 character(s)'
          }
        ]
      }))
    })

    it('Should return 200 when check-username username not exits', async () => {
      const response = await request(app.getHttpServer())
        .get('/user/check-username/free-username')

      expect(response.statusCode).toBe(200)
    })

    it('Should return 400 when check-username is bad word', async () => {
      const response = await request(app.getHttpServer())
        .get('/user/check-username/ash0le')

      expect(response.statusCode).toBe(400)
      expect(response.body).toEqual(expect.objectContaining({
        detail: 'Username with bad words'
      }))
    })

    it('Should return 400 when post to username exits', async () => {
      await prismaService.user.create({
        data: makeUserModel()
      })
      const response = await request(app.getHttpServer())
        .get('/user/check-username/valid-username')
      expect(response.statusCode).toBe(400)
      expect(response.body).toEqual(expect.objectContaining({
        detail: 'Username already exists'
      }))
    })
  })
  describe('POST /user', () => {
    it('Should return 204 when register an user', async () => {
      await prismaService.playerProfile.create({
        data: {
          id: '9228a9a0-c7e0-4d62-80bb-458dd772c4f9',
          name: 'Player',
          description: 'some description'
        }
      })
      await prismaService.rpgStyle.create({
        data: {
          id: 'b866459b-63fc-4bd3-a88c-f6d4a7f39cd2',
          name: 'Rpg Style'
        }
      })
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

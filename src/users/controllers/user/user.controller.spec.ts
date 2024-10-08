import { AppModule } from '@/app.module'
import { PrismaService } from '@/shared/prisma/prisma.service'
import { type UserModel } from '@/users/repository/entity/user.model'
import type { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'

let prismaService: PrismaService
let app: INestApplication

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
    await app.init()
  })

  afterAll(async () => {
    await prismaService.$disconnect()
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
})

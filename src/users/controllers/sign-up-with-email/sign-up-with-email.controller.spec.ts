import { AppModule } from '@/app.module'
import { PrismaService } from '@/shared/prisma/prisma.service'
import type { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import jwt, { type JwtPayload } from 'jsonwebtoken'
import request from 'supertest'

describe('SignUpController', () => {
  let app: INestApplication
  let prismaService: PrismaService
  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule]
    }).compile()
    app = module.createNestApplication()
    prismaService = module.get<PrismaService>(PrismaService)
    await app.init()
  })

  beforeEach(async () => {
    await prismaService.userPreferenceRpgStyle.deleteMany()
    await prismaService.userPreferenceDayPeriod.deleteMany()
    await prismaService.userPreferenceGamePlace.deleteMany()
    await prismaService.userPreferencePlayersRange.deleteMany()
    await prismaService.externalAuthMapping.deleteMany()
    await prismaService.userPreference.deleteMany()
    await prismaService.userSocialMedia.deleteMany()
    await prismaService.userConfig.deleteMany()
    await prismaService.userBadge.deleteMany()
    await prismaService.user.deleteMany()
    await prismaService.address.deleteMany()
    await prismaService.cityState.deleteMany()
    await prismaService.userWithEmail.deleteMany()
    await prismaService.playerProfile.deleteMany()
    await prismaService.rpgStyle.deleteMany()
    await prismaService.badge.deleteMany()
    await prismaService.socialMedia.deleteMany()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should return status 201 and a token when a new user is created', async () => {
    const signUpWithEmailDto = {
      email: 'test@example.com',
      password: 'test123'
    }

    const response = await request(app.getHttpServer())
      .post('/user/signup/email')
      .send(signUpWithEmailDto)
    expect(response.statusCode).toBe(201)
    expect(response.body).toBeTruthy()
    const decodeToken = jwt.decode(response.body.token) as JwtPayload
    expect(decodeToken.payload.email).toEqual(signUpWithEmailDto.email)
  })

  it('should return status 400 when the email or password is invalid', async () => {
    const signUpWithEmailDto = {
      email: 'test@.com',
      password: 'asdf'
    }

    await request(app.getHttpServer())
      .post('/user/signup/email')
      .send(signUpWithEmailDto)
      .expect(400)
  })
})

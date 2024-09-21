import { Test, type TestingModule } from '@nestjs/testing'
import { SignUpController } from './sign-up-with-email.controller'
import { SignUpService } from './sign-up-with-email.service'
import { SharedModule } from '@/shared/shared.module'
import type { INestApplication } from '@nestjs/common'
import request from 'supertest'
import { UuidAdapter } from '@/infra/uuid-adapter/uuid-adapter'
import { PrismaService } from '@/shared/prisma/prisma.service'
import { JwtSignAdapterV2 } from '@/infra/cryptography/jwt-sign-adapter-v2'

describe('SignUpController', () => {
  let app: INestApplication
  let controller: SignUpController
  let service: SignUpService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SignUpController],
      providers: [
        SignUpService,
        UuidAdapter,
        JwtSignAdapterV2,
        PrismaService
      ],
      imports: [SharedModule]
    }).compile()

    app = module.createNestApplication()
    await app.init()

    controller = module.get<SignUpController>(SignUpController)
    service = module.get<SignUpService>(SignUpService)
  })

  afterEach(async () => {
    jest.clearAllMocks()
    await app.close()
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  it('should return status 201 and a token when a new user is created', async () => {
    const signUpWithEmailDto = {
      email: 'test@example.com',
      password: 'test123'
    }

    const token = 'some-token'

    jest.spyOn(service, 'create').mockResolvedValueOnce({ token })

    await request(app.getHttpServer())
      .post('/user/signup/email')
      .send(signUpWithEmailDto)
      .expect(201)
      .expect({ token })
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

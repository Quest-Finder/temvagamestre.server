import { AppModule } from '@/app.module'
import { PrismaService } from '@/shared/prisma/prisma.service'
import { type INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'

let prismaService: PrismaService
let app: INestApplication
describe('FakeUserController', () => {
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule]
    }).compile()
    prismaService = module.get<PrismaService>(PrismaService)
    app = module.createNestApplication()
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

  describe('Get /fake-user/generate-token', () => {
    it('Should return 200 when adding a fake user', async () => {
      await request(app.getHttpServer())
        .get('/fake-user/generate-token')
        .expect(200)
        .then(response => {
          expect(response.body).toBeTruthy()
        })
    })
  })
})

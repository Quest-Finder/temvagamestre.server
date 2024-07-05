import { AppModule } from '@/app.module'
import { PrismaHelper } from '@/infra/database/prisma/helpers'
import { type INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'

let app: INestApplication
describe('Rpg Style Routes', () => {
  beforeAll(async () => {
    await PrismaHelper.connect()
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

  describe('GET /player-profile', () => {
    it('Should return 200 with a empty player profile list', async () => {
      await request(app.getHttpServer())
        .get('/players-profile')
        .expect(200)
        .expect((res) => {
          expect(res.body).toEqual(
            []
          )
        })
    })
  })
})

import { AppModule } from '@/main/app.module'
import { type INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'

describe('CORS Middleware', () => {
  let app: INestApplication

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule]
    }).compile()

    app = module.createNestApplication()
    await app.init()
  })

  afterAll(async () => {
    await app.close()
  })

  it('Should enable CORS', async () => {
    await request(app.getHttpServer())
      .get('/test_cors')
      .expect('access-control-allow-origin', '*')
      .expect('access-control-allow-methods', '*')
      .expect('access-control-allow-headers', '*')
  })
})

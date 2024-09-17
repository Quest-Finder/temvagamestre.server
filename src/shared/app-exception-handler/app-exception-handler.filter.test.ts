import { AppModule } from '@/app.module'
import { type INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import session, { type SessionOptions } from 'express-session'
import request from 'supertest'

const sessionConfig: SessionOptions = {
  secret: 'any_secret_key',
  resave: false,
  saveUninitialized: false
}

let app: INestApplication
describe('AppExceptionHandlerFilter', () => {
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule]
    }).compile()
    app = module.createNestApplication()
    app.use(session(sessionConfig))
    await app.init()
  })

  afterEach(async () => {
    await app.close()
  })

  it('Should return 400 if not body is provided', async () => {
    await request(app.getHttpServer())
      .post('/city-state')
      .send()
      .expect(400)
      .expect((res) => {
        expect(res.body).toEqual(
          expect.objectContaining({
            detail: 'Erro na validação de campos',
            title: 'Bad Request',
            statusCode: 400
          })
        )
      })
  })
})

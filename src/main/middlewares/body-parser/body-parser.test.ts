import createApp from '@/main/configs/app'
import request from 'supertest'

describe('BodyParser Middleware', () => {
  it('Should parse body as json', async () => {
    const app = await createApp()
    app.getHttpAdapter().post('/test_body_parser', (req, res) => {
      res.json(req.body)
    })
    await request(app.getHttpServer())
      .post('/test_body_parser')
      .send({ field: 'any_value' })
      .expect({ field: 'any_value' })
  })
})

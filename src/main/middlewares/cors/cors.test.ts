import request from 'supertest'
import createApp from '@/main/configs/app'

describe('CORS Middleware', () => {
  it('Should enable CORS', async () => {
    const app = await createApp()
    await request(app.getHttpServer())
      .get('/test_cors')
      .expect('access-control-allow-origin', '*')
      .expect('access-control-allow-methods', '*')
      .expect('access-control-allow-headers', '*')
  })
})

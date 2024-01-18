import { UpdateUserConfigsController } from './update-user-configs-controller'

describe('UpdateUserConfigsController', () => {
  it('Should return 400 if allow message was not provided', async () => {
    const sut = new UpdateUserConfigsController()
    const httpResponse = await sut.handle({ body: {} })
    expect(httpResponse.statusCode).toBe(400)
  })
})

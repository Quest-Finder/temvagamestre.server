import { type UpdateUserConfigs, type UpdateUserConfigsData, type UpdateUserConfigsResponse } from '@/domain/contracts/user'
import { UpdateUserConfigsController } from './update-user-configs-controller'
import { right } from '@/shared/either'

describe('UpdateUserConfigsController', () => {
  it('Should return 400 if allow message was not provided', async () => {
    class UpdateUserConfigsStub implements UpdateUserConfigs {
      async perform (data: UpdateUserConfigsData): Promise<UpdateUserConfigsResponse> {
        return await Promise.resolve(right(null))
      }
    }
    const updateUserConfigsStub = new UpdateUserConfigsStub()
    const sut = new UpdateUserConfigsController(updateUserConfigsStub)
    const httpResponse = await sut.handle({
      headers: { userId: 'any_user_id' },
      body: {}
    })
    expect(httpResponse.statusCode).toBe(400)
  })

  it('Should call UpdateUserConfigs with correct values', async () => {
    class UpdateUserConfigsStub implements UpdateUserConfigs {
      async perform (data: UpdateUserConfigsData): Promise<UpdateUserConfigsResponse> {
        return await Promise.resolve(right(null))
      }
    }
    const updateUserConfigsStub = new UpdateUserConfigsStub()
    const sut = new UpdateUserConfigsController(updateUserConfigsStub)
    const performSpy = jest.spyOn(updateUserConfigsStub, 'perform')
    await sut.handle({
      headers: { userId: 'any_user_id' },
      body: { allowMessage: true }
    })
    expect(performSpy).toHaveBeenCalledWith({
      userId: 'any_user_id',
      allowMessage: true
    })
  })
})

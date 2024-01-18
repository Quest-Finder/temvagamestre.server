import { type UpdateUserConfigs, type UpdateUserConfigsData, type UpdateUserConfigsResponse } from '@/domain/contracts/user'
import { UpdateUserConfigsController } from './update-user-configs-controller'
import { left, right } from '@/shared/either'

type SutTypes = {
  sut: UpdateUserConfigsController
  updateUserConfigsStub: UpdateUserConfigs
}

const makeSut = (): SutTypes => {
  class UpdateUserConfigsStub implements UpdateUserConfigs {
    async perform (data: UpdateUserConfigsData): Promise<UpdateUserConfigsResponse> {
      return await Promise.resolve(right(null))
    }
  }
  const updateUserConfigsStub = new UpdateUserConfigsStub()
  const sut = new UpdateUserConfigsController(updateUserConfigsStub)
  return { sut, updateUserConfigsStub }
}

describe('UpdateUserConfigsController', () => {
  it('Should return 400 if allow message was not provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({
      headers: { userId: 'any_user_id' },
      body: {}
    })
    expect(httpResponse.statusCode).toBe(400)
  })

  it('Should call UpdateUserConfigs with correct values', async () => {
    const { sut, updateUserConfigsStub } = makeSut()
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

  it('Should return 400 if UpdateUserConfigs returns an Error', async () => {
    const { sut, updateUserConfigsStub } = makeSut()
    jest.spyOn(updateUserConfigsStub, 'perform').mockReturnValueOnce(
      Promise.resolve(left(new Error('any_message')))
    )
    const httpResponse = await sut.handle({
      headers: { userId: 'any_user_id' },
      body: { allowMessage: true }
    })
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new Error('any_message'))
  })

  it('Should return 204 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({
      headers: { userId: 'any_user_id' },
      body: { allowMessage: true }
    })
    expect(httpResponse.statusCode).toBe(204)
  })
})

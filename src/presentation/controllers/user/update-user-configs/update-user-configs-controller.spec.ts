import type { UpdateUserConfigs, UpdateUserConfigsData, UpdateUserConfigsResponse } from '@/domain/contracts/user'
import { UpdateUserConfigsController } from './update-user-configs-controller'
import { type Either, left, right } from '@/shared/either'
import { type Validation } from '@/presentation/contracts'

type SutTypes = {
  sut: UpdateUserConfigsController
  updateUserConfigsStub: UpdateUserConfigs
  validationStub: Validation
}

const makeSut = (): SutTypes => {
  class UpdateUserConfigsStub implements UpdateUserConfigs {
    async perform (data: UpdateUserConfigsData): Promise<UpdateUserConfigsResponse> {
      return await Promise.resolve(right(null))
    }
  }
  class ValidationStub implements Validation {
    async validate (input: any): Promise<Either<Error, null>> {
      return await Promise.resolve(right(null))
    }
  }
  const updateUserConfigsStub = new UpdateUserConfigsStub()
  const validationStub = new ValidationStub()
  const sut = new UpdateUserConfigsController(validationStub, updateUserConfigsStub)
  return { sut, updateUserConfigsStub, validationStub }
}

describe('UpdateUserConfigsController', () => {
  it('Should call Validation with allow message', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    await sut.handle({
      headers: { userId: 'any_user_id' },
      body: { allowMessage: true }
    })
    expect(validateSpy).toHaveBeenCalledWith({ allowMessage: true })
  })

  it('Should return 400 if Validation returns an Error', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(
      Promise.resolve(left(new Error('any_message')))
    )
    const httpResponse = await sut.handle({
      headers: { userId: 'any_user_id' },
      body: { allowMessage: true }
    })
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new Error('any_message'))
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

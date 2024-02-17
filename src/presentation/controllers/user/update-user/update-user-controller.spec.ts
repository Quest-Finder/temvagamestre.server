import type { Validation } from '@/presentation/contracts'
import { badRequest, noContent, serverError } from '@/presentation/helpers/http-helpers'
import type { HttpRequest } from '@/presentation/types/http'
import { left, right, type Either } from '@/shared/either'
import { UpdateUserController } from './update-user-controller'
import type { UpdateUserData, UpdateUser, UpdateUserResponse } from '@/domain/contracts/user'

const makeFakeRequest = (): HttpRequest => ({
  headers: {
    userId: 'any_user_id'
  },
  body: {
    firstName: 'any_first_name',
    lastName: 'any_last_name',
    phone: 'any_phone',
    dateOfBirth: '12-31-2000',
    nickname: 'any_nickname'
  }
})

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Either<Error, void> {
      return right()
    }
  }
  return new ValidationStub()
}

const makeFakeUpdateUser = (): UpdateUser => {
  class UpdateUserStub implements UpdateUser {
    async perform (data: UpdateUserData): Promise<UpdateUserResponse> {
      return await Promise.resolve(right())
    }
  }
  return new UpdateUserStub()
}

type SutTypes = {
  sut: UpdateUserController
  validationStub: Validation
  updateUserStub: UpdateUser
}

const makeSut = (): SutTypes => {
  const validationStub = makeValidation()
  const updateUserStub = makeFakeUpdateUser()
  const sut = new UpdateUserController(validationStub, updateUserStub)
  return { sut, validationStub, updateUserStub }
}

describe('UpdateUserController', () => {
  it('Should call Validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    await sut.handle(makeFakeRequest())
    expect(validateSpy).toHaveBeenCalledWith(makeFakeRequest().body)
  })

  it('Should return 400 if Validation fails', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(
      left(new Error('any_message'))
    )
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(badRequest(new Error('any_message')))
  })

  it('Should return 500 if Validation throws', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  it('Should call UpdateUser with correct values', async () => {
    const { sut, updateUserStub } = makeSut()
    const performSpy = jest.spyOn(updateUserStub, 'perform')
    await sut.handle(makeFakeRequest())
    expect(performSpy).toHaveBeenCalledWith({
      id: 'any_user_id',
      ...makeFakeRequest().body
    })
  })

  it('Should return 400 if UpdateUser fails', async () => {
    const { sut, updateUserStub } = makeSut()
    jest.spyOn(updateUserStub, 'perform').mockReturnValueOnce(
      Promise.resolve(left(new Error('any_message')))
    )
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(badRequest(new Error('any_message')))
  })

  it('Should return 500 if UpdateUser throws', async () => {
    const { sut, updateUserStub } = makeSut()
    jest.spyOn(updateUserStub, 'perform').mockReturnValueOnce(
      Promise.reject(new Error())
    )
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  it('Should return 204 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(noContent())
  })
})

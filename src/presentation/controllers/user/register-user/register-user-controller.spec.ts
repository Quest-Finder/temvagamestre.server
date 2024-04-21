import type { Validation } from '@/presentation/contracts'
import { badRequest, noContent, serverError } from '@/presentation/helpers/http-helpers'
import type { HttpRequest } from '@/presentation/types/http'
import { left, right, type Either } from '@/shared/either'
import { RegisterUserController } from './register-user-controller'
import type { RegisterUser, RegisterUserResponse } from '@/domain/contracts/user'
import { type RegisterUserData } from '@/domain/entities/user'

const makeFakeRequest = (): HttpRequest => ({
  headers: {
    userId: 'any_user_id'
  },
  body: {
    name: 'any_name',
    pronoun: 'he/his',
    dateOfBirth: '12-31-2000',
    username: 'any_username'
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

const makeFakeRegisterUser = (): RegisterUser => {
  class RegisterUserStub implements RegisterUser {
    async perform (data: RegisterUserData): Promise<RegisterUserResponse> {
      return await Promise.resolve(right())
    }
  }
  return new RegisterUserStub()
}

type SutTypes = {
  sut: RegisterUserController
  validationStub: Validation
  registerUserStub: RegisterUser
}

const makeSut = (): SutTypes => {
  const validationStub = makeValidation()
  const registerUserStub = makeFakeRegisterUser()
  const sut = new RegisterUserController(validationStub, registerUserStub)
  return { sut, validationStub, registerUserStub }
}

describe('RegisterUserController', () => {
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

  it('Should call RegisterUser with correct values', async () => {
    const { sut, registerUserStub } = makeSut()
    const performSpy = jest.spyOn(registerUserStub, 'perform')
    await sut.handle(makeFakeRequest())
    expect(performSpy).toHaveBeenCalledWith({
      id: 'any_user_id',
      ...makeFakeRequest().body
    })
  })

  it('Should return 400 if RegisterUser fails', async () => {
    const { sut, registerUserStub } = makeSut()
    jest.spyOn(registerUserStub, 'perform').mockReturnValueOnce(
      Promise.resolve(left(new Error('any_message')))
    )
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(badRequest(new Error('any_message')))
  })

  it('Should return 500 if RegisterUser throws', async () => {
    const { sut, registerUserStub } = makeSut()
    jest.spyOn(registerUserStub, 'perform').mockReturnValueOnce(
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

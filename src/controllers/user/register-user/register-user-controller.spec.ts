import type { Validation } from '@/contracts'
import type { RegisterUser, RegisterUserResponse } from '@/contracts/user'
import { type CheckUserById, type CheckUserByIdResponse } from '@/contracts/user/check-by-id'
import { type RegisterUserData } from '@/entities/user'
import { badRequest, noContent, serverError } from '@/helpers/http/http-helpers'
import { left, right, type Either } from '@/shared/either'
import type { HttpRequest } from '@/types/http'
import { RegisterUserController } from './register-user-controller'

const makeFakeRequest = (): HttpRequest => ({
  headers: {
    userId: 'any_user_id'
  },
  body: {
    name: 'any_name',
    pronoun: 'he/his',
    dateOfBirth: '12-31-2000',
    username: 'any_username',
    bio: 'any_bio'
  },
  session: {}
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
    async perform (data: RegisterUserData, session: any): Promise<RegisterUserResponse> {
      return await Promise.resolve(right())
    }
  }
  return new RegisterUserStub()
}

const makeCheckUserByIdUseCase = (): CheckUserById => {
  class FakeCheckUserById implements CheckUserById {
    async perform (id: string): Promise<CheckUserByIdResponse> {
      return await Promise.resolve(left(new Error('User')))
    }
  }
  return new FakeCheckUserById()
}

type SutTypes = {
  sut: RegisterUserController
  validationStub: Validation
  registerUserStub: RegisterUser
  checkUserByIdUseCase: CheckUserById
}

const makeSut = (): SutTypes => {
  const validationStub = makeValidation()
  const registerUserStub = makeFakeRegisterUser()
  const checkUserByIdUseCase = makeCheckUserByIdUseCase()
  const sut = new RegisterUserController(validationStub, registerUserStub, checkUserByIdUseCase)
  return { sut, validationStub, registerUserStub, checkUserByIdUseCase }
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

  it('Should return 400 if user already exits', async () => {
    const { sut, checkUserByIdUseCase } = makeSut()
    jest.spyOn(checkUserByIdUseCase, 'perform').mockResolvedValue(right({ id: 'valid_id', name: 'John doe', email: 'valid@email.com', username: 'valid_username' }))
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(badRequest(new Error('User already exits')))
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
    }, makeFakeRequest().session)
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

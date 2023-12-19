import type { Auth, AuthResponse } from '@/domain/contracts/user'
import { AccessDeniedError, InvalidTokenError } from '@/domain/errors'
import { type Validation } from '@/presentation/contracts'
import { AccessTokenNotInformedError } from '@/presentation/errors'
import { forbidden, ok, serverError, unauthorized } from '@/presentation/helpers/http-helpers'
import { type HttpRequest } from '@/presentation/types/http'
import { left, right, type Either } from '@/shared/either'
import { AuthMiddleware } from './auth-middleware'

const makeFakeRequest = (): HttpRequest => ({
  headers: { accessToken: 'any_token' }
})

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    async validate (input: any): Promise<Either<Error, null>> {
      return await Promise.resolve(right(null))
    }
  }
  return new ValidationStub()
}

const makeAuth = (): Auth => {
  class AuthStub implements Auth {
    async perform (token: string): Promise<AuthResponse> {
      return await Promise.resolve(right({ userId: 'any_id' }))
    }
  }
  return new AuthStub()
}

interface SutTypes {
  sut: AuthMiddleware
  validationStub: Validation
  authStub: Auth
}

const makeSut = (): SutTypes => {
  const validationStub = makeValidation()
  const authStub = makeAuth()
  const sut = new AuthMiddleware(validationStub, authStub)
  return { sut, validationStub, authStub }
}

describe('Auth Middleware', () => {
  it('Should return 401 if access token not provided in headers', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(unauthorized(new AccessTokenNotInformedError()))
  })

  it('Should call Validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    await sut.handle(makeFakeRequest())
    expect(validateSpy).toHaveBeenCalledWith(makeFakeRequest().headers)
  })

  it('Should return 400 if Validation fails', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(
      Promise.resolve(left(new Error('any_message')))
    )
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(unauthorized(new Error('any_message')))
  })

  it('Should return 500 if Validation throws', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(
      Promise.reject(new Error())
    )
    const httpResponse = await sut.handle(makeFakeRequest())
    const error = new Error()
    error.stack = 'any_stack'
    expect(httpResponse).toEqual(serverError())
  })

  it('Should call Auth with correct values', async () => {
    const { sut, authStub } = makeSut()
    const performSpy = jest.spyOn(authStub, 'perform')
    await sut.handle(makeFakeRequest())
    expect(performSpy).toHaveBeenCalledWith('any_token')
  })

  it('Should return 401 if Auth return InvalidTokenError', async () => {
    const { sut, authStub } = makeSut()
    jest.spyOn(authStub, 'perform').mockReturnValueOnce(
      Promise.resolve(left(new InvalidTokenError()))
    )
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(unauthorized(new InvalidTokenError()))
  })

  it('Should return 403 if Auth return AccessDeniedError', async () => {
    const { sut, authStub } = makeSut()
    jest.spyOn(authStub, 'perform').mockReturnValueOnce(
      Promise.resolve(left(new AccessDeniedError()))
    )
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()))
  })

  it('Should return 500 if Auth throws', async () => {
    const { sut, authStub } = makeSut()
    jest.spyOn(authStub, 'perform').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError())
  })

  it('Should return 200 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(ok({ userId: 'any_id' }))
  })
})

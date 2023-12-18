import { left, right } from '@/shared/either'
import { AccessDeniedError, InvalidTokenError } from '@/domain/errors'
import { type HttpRequest } from '@/presentation/types/http'
import type { Auth, AuthResponse } from '@/domain/contracts/user'
import { AuthMiddleware } from './auth-middleware'
import { forbidden, ok, serverError, unauthorized } from '@/presentation/helpers/http-helpers'
import { AccessTokenNotInformedError } from '@/presentation/errors'

const makeFakeRequest = (): HttpRequest => ({
  headers: { accessToken: 'any_token' }
})

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
  authStub: Auth
}

const makeSut = (): SutTypes => {
  const authStub = makeAuth()
  const sut = new AuthMiddleware(authStub)
  return { sut, authStub }
}

describe('Auth Middleware', () => {
  it('Should return 401 if access token not provided in headers', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(unauthorized(new AccessTokenNotInformedError()))
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

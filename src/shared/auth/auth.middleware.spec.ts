import { type TokenPayload, type TokenValidation } from '@/shared/token-validations/token-validation'
/* eslint-disable @typescript-eslint/consistent-type-assertions */

import { type UserModel } from '@/users/repository/entity/user.model'
import { type UserRepository } from '@/users/repository/user/user-repository'
import { type NextFunction, type Request, type Response } from 'express'
import { AuthMiddleware } from './auth.middleware'

type MakeSutType = {
  repository: UserRepository
  sut: AuthMiddleware
  firstValidation: TokenValidation
  secondValidation: TokenValidation
}

type FakeRequest = Request & {
  headers: {
    'x-access-token': string
  }
}

class MockFirstTokenValidation implements TokenValidation {
  verify (token: any): TokenPayload | undefined {
    return {
      externalUserId: 'clerk-valid-id'
    }
  }
}
class MockSecondTokenValidation implements TokenValidation {
  verify (token: any): TokenPayload | undefined {
    return {
      externalUserId: 'app-valid-id'
    }
  }
}

const makeFakeUserRepository = (): UserRepository => {
  class MakeFakeUserRepository {
    async findByExternalAuthId (externalId: string): Promise<UserModel | undefined> {
      return {
        id: 'valid-id',
        email: 'validemail@email.com',
        name: 'John doe'
      }
    }
  }
  return new MakeFakeUserRepository() as UserRepository
}

const makeSut = (): MakeSutType => {
  const firstValidation = new MockFirstTokenValidation()
  const secondValidation = new MockSecondTokenValidation()
  const repository = makeFakeUserRepository()
  const sut = new AuthMiddleware(repository, [firstValidation, secondValidation])
  return {
    sut, repository, firstValidation, secondValidation
  }
}
const fakeNextFunction = (): NextFunction => {
  return () => {}
}

const fakeResponse = (): Response => {
  return {} as Response
}

describe('AuthMiddleware', () => {
  it('should be defined', () => {
    const { sut } = makeSut()
    expect(sut).toBeDefined()
  })

  it('should call all token validations ', async () => {
    const { sut, firstValidation, secondValidation } = makeSut()
    jest.spyOn(firstValidation, 'verify').mockReturnValue(undefined)
    const firstValidationSpy = jest.spyOn(firstValidation, 'verify')
    const secondValidationSpy = jest.spyOn(secondValidation, 'verify')
    const request = {
      headers: {
        'x-access-token': 'any-valid-token'
      }
    } as FakeRequest
    await sut.use(request, fakeResponse(), fakeNextFunction())
    expect(firstValidationSpy).toHaveBeenCalled()
    expect(secondValidationSpy).toHaveBeenCalled()
  })

  it('should throws if x-access-token not has provided', async () => {
    const { sut } = makeSut()
    const request = { body: {} } as FakeRequest
    try {
      await sut.use(request, fakeResponse(), fakeNextFunction())
    } catch (error: any) {
      expect(error.response.message).toEqual('Token not provided')
    }
  })

  it('should throws if x-access-token not valid', async () => {
    const { sut } = makeSut()
    const request = {
      headers: {
        'x-access-token': 'any-valid-token'
      }
    } as FakeRequest
    try {
      await sut.use(request, fakeResponse(), fakeNextFunction())
    } catch (error: any) {
      expect(error.response.message).toEqual('Invalid token')
    }
  })

  it('should throws if x-access-token not valid', async () => {
    const { sut, firstValidation } = makeSut()
    jest.spyOn(firstValidation, 'verify').mockReturnValue(undefined)
    const request = {
      headers: {
        'x-access-token': 'any-valid-token'
      }
    } as FakeRequest
    try {
      await sut.use(request, fakeResponse(), fakeNextFunction())
    } catch (error: any) {
      expect(error.response.message).toEqual('Invalid token')
    }
  })

  it('should throws if external user id not found', async () => {
    const { sut, repository } = makeSut()
    jest.spyOn(repository, 'findByExternalAuthId').mockResolvedValueOnce(undefined)
    const request = {
      headers: {
        'x-access-token': 'any-valid-token'
      }
    } as FakeRequest
    try {
      await sut.use(request, fakeResponse(), fakeNextFunction())
    } catch (error: any) {
      expect(error.response.message).toEqual('User not found')
    }
  })

  it('should throws if external user id not found', async () => {
    const { sut, repository } = makeSut()

    jest.spyOn(repository, 'findByExternalAuthId').mockResolvedValueOnce(undefined)
    const request = {
      headers: {
        'x-access-token': 'any-valid-token'
      }
    } as FakeRequest
    try {
      await sut.use(request, fakeResponse(), fakeNextFunction())
    } catch (error: any) {
      expect(error.response.message).toEqual('User not found')
    }
  })

  it('should call return void if success', async () => {
    const { sut } = makeSut()

    const request = {
      headers: {
        'x-access-token': 'any-valid-token'
      }
    } as FakeRequest
    await sut.use(request, fakeResponse(), fakeNextFunction())
    expect(sut).toBeTruthy()
  })
})

/* eslint-disable @typescript-eslint/consistent-type-assertions */

import { type UserModel } from '@/users/repository/entity/user.model'
import { type UserRepository } from '@/users/repository/user/user-repository'
import { type NextFunction, type Request, type Response } from 'express'
import jwt from 'jsonwebtoken'
import { AuthMiddleware } from './auth.middleware'

type MakeSutType = {
  jwtSpy: jest.SpyInstance
  repository: UserRepository
  sut: AuthMiddleware
}

type FakeRequest = Request & {
  headers: {
    'x-access-token': string
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
  const jwtSpy = jest.spyOn(jwt, 'verify' as any)

  const repository = makeFakeUserRepository()
  const sut = new AuthMiddleware(repository)
  return {
    sut, repository, jwtSpy
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
    const { sut, jwtSpy } = makeSut()
    jwtSpy.mockReturnValue(new Error())
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
    const { sut, repository, jwtSpy } = makeSut()
    jwtSpy.mockReturnValue({
      clerkUserId: 'external-user-id'
    })
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
    const { sut, jwtSpy, repository } = makeSut()
    jwtSpy.mockReturnValue({
      clerkUserId: 'external-user-id'
    })
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
    const { sut, jwtSpy } = makeSut()
    jwtSpy.mockReturnValue({
      clerkUserId: 'external-user-id'
    })
    const request = {
      headers: {
        'x-access-token': 'any-valid-token'
      }
    } as FakeRequest
    await sut.use(request, fakeResponse(), fakeNextFunction())
    expect(sut).toBeTruthy()
  })
})

import { type FindUserById, type FindUserByIdData, type FindUserByIdResponse } from '@/domain/contracts/user'
import { type Controller } from '@/presentation/contracts'
import { forbidden, ok, serverError } from '@/presentation/helpers/http-helpers'
import { type HttpRequest } from '@/presentation/types/http'
import { left, right } from '@/shared/either'
import { MeController } from './me-controller'

type MakeSutType = {
  sut: Controller
  findUserById: FindUserById
}

const makeHttpRequest = (): HttpRequest => {
  return {
    headers: {
      userId: 'any_user_id'
    }
  }
}

const makeFindUserById = (): FindUserById => {
  class FindUserByIdStub implements FindUserById {
    async perform (data: FindUserByIdData): Promise<FindUserByIdResponse> {
      return await Promise.resolve(right({
        id: 'valid_id',
        firstName: 'John',
        lastName: 'Doe',
        email: 'vadid_email@mail.com'
      }))
    }
  }
  return new FindUserByIdStub()
}

const makeSut = (): MakeSutType => {
  const findUserById = makeFindUserById()
  const sut = new MeController(findUserById)
  return {
    sut, findUserById
  }
}

describe('MeController', () => {
  it('should call FindUserById with correct values', async () => {
    const { sut, findUserById } = makeSut()
    const findUserByIdSpy = jest.spyOn(findUserById, 'perform')
    await sut.handle(makeHttpRequest())
    expect(findUserByIdSpy).toHaveBeenCalledWith({ userId: 'any_user_id' })
  })

  it('Should return 500 if SaveUserPreferenceGamePlace throws', async () => {
    const { sut, findUserById } = makeSut()
    jest.spyOn(findUserById, 'perform').mockRejectedValueOnce(new Error())
    const response = await sut.handle(makeHttpRequest())
    expect(response).toEqual(serverError(new Error()))
  })

  it('should return 403 if FindUserById fails', async () => {
    const { sut, findUserById } = makeSut()
    jest.spyOn(findUserById, 'perform').mockResolvedValueOnce(left(new Error()))
    const response = await sut.handle(makeHttpRequest())
    expect(response).toEqual(forbidden(new Error()))
  })

  it('should return 200 on success', async () => {
    const { sut } = makeSut()
    const response = await sut.handle(makeHttpRequest())
    expect(response).toEqual(ok({
      id: 'valid_id',
      firstName: 'John',
      lastName: 'Doe',
      email: 'vadid_email@mail.com'
    }))
  })
})

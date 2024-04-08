import { type FindUserById, type FindUserByIdData, type FindUserByIdResponse } from '@/domain/contracts/user'
import { type Controller } from '@/presentation/contracts'
import { serverError } from '@/presentation/helpers/http-helpers'
import { type HttpRequest } from '@/presentation/types/http'
import { right } from '@/shared/either'
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
        firstName: 'string',
        lastName: 'string',
        email: 'string'
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
})

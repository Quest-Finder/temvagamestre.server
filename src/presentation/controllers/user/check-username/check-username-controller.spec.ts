import { type CheckUsername, type CheckUsernameResponse } from '@/domain/contracts/user/check-username'
import { type Controller } from '@/presentation/contracts'
import { badRequest, serverError } from '@/presentation/helpers/http-helpers'
import { type HttpRequest } from '@/presentation/types/http'
import { left, right, type Either } from '@/shared/either'
import { type Validation } from './../../../contracts/validation'
import { CheckUsernameController } from './check-username-controller'

type MakeSutType = {
  validation: Validation
  sut: Controller
  useCase: CheckUsername
}

class CheckUsernameUseCaseStub implements CheckUsername {
  async perform (username: string): Promise<CheckUsernameResponse> {
    return right()
  }
}

class ValidationStub implements Validation {
  validate (input: any): Either<Error, void> {
    return right()
  }
}

const makeHttpRequest = (): HttpRequest => {
  return {
    params: {
      username: 'valid-username'
    }
  }
}

const makeSut = (): MakeSutType => {
  const validation = new ValidationStub()
  const useCase = new CheckUsernameUseCaseStub()
  const sut = new CheckUsernameController(validation, useCase)
  return {
    sut,
    validation,
    useCase
  }
}

describe('CheckUsernameController', () => {
  it('should call validation with correct values', async () => {
    const { sut, validation } = makeSut()
    const validationStubSpy = jest.spyOn(validation, 'validate')
    await sut.handle(makeHttpRequest())
    expect(validationStubSpy).toHaveBeenCalledWith('valid-username')
  })

  it('should return 400 if validation fails', async () => {
    const { sut, validation } = makeSut()
    jest.spyOn(validation, 'validate').mockReturnValue(left(new Error('error-message')))
    const response = await sut.handle(makeHttpRequest())
    expect(response).toEqual(badRequest(new Error('error-message')))
  })

  it('should call findUseByUsernameUseCase with correct value', async () => {
    const { sut, useCase } = makeSut()
    const useCaseSpy = jest.spyOn(useCase, 'perform')
    await sut.handle(makeHttpRequest())
    expect(useCaseSpy).toHaveBeenCalledWith('valid-username')
  })

  it('should return 400 if username already exists', async () => {
    const { sut, useCase } = makeSut()
    jest.spyOn(useCase, 'perform').mockResolvedValue(left(new Error('Username already exists')))
    const response = await sut.handle(makeHttpRequest())
    expect(response).toEqual(badRequest(new Error('Username already exists')))
  })

  it('should return 500 when checkUsernameUsecase throws', async () => {
    const { sut, useCase } = makeSut()
    jest.spyOn(useCase, 'perform').mockRejectedValueOnce(new Error())
    const response = await sut.handle(makeHttpRequest())
    expect(response).toEqual(serverError(new Error()))
  })
})

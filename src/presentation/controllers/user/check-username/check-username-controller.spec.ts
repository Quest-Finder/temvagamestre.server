import { type CheckUsername, type CheckUsernameResponse } from '@/domain/contracts/user/check-username'
import { type Controller } from '@/presentation/contracts'
import { badRequest, ok, serverError } from '@/presentation/helpers/http-helpers'
import { type HttpRequest } from '@/presentation/types/http'
import { left, right, type Either } from '@/shared/either'
import { type Validation } from './../../../contracts/validation'
import { CheckUsernameController } from './check-username-controller'

type MakeSutType = {
  validations: Validation[]
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

class WordsValidation implements Validation {
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
  const wordValidation = new WordsValidation()
  const useCase = new CheckUsernameUseCaseStub()
  const sut = new CheckUsernameController([validation, wordValidation], useCase)
  return {
    sut,
    validations: [validation, wordValidation],
    useCase
  }
}

describe('CheckUsernameController', () => {
  it('should call all validations with correct value', async () => {
    const { sut, validations } = makeSut()
    const [validation, wordValidation] = validations
    const validationStubSpy = jest.spyOn(validation, 'validate')
    const wordValidationStubSpy = jest.spyOn(wordValidation, 'validate')
    await sut.handle(makeHttpRequest())
    expect(validationStubSpy).toHaveBeenCalledWith('valid-username')
    expect(wordValidationStubSpy).toHaveBeenCalledWith('valid-username')
  })

  it('should return 400 if any validation fails', async () => {
    const { sut, validations } = makeSut()
    jest.spyOn(validations[0], 'validate').mockReturnValue(left(new Error('error-message')))
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

  it('should return 200 if username not exits', async () => {
    const { sut } = makeSut()
    const response = await sut.handle(makeHttpRequest())
    expect(response).toEqual(ok({ message: 'Username is available' }))
  })
})

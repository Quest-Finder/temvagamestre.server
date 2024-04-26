import { type Controller } from '@/presentation/contracts'
import { badRequest } from '@/presentation/helpers/http-helpers'
import { type HttpRequest } from '@/presentation/types/http'
import { left, right, type Either } from '@/shared/either'
import { type Validation } from './../../../contracts/validation'
import { CheckUsernameController } from './check-username-controller'

type MakeSutType = {
  validation: Validation
  sut: Controller
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
  const sut = new CheckUsernameController(validation)
  return {
    sut,
    validation
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
})

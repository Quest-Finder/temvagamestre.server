import { type Controller } from '@/presentation/contracts'
import { type HttpRequest } from '@/presentation/types/http'
import { right, type Either } from '@/shared/either'
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
})

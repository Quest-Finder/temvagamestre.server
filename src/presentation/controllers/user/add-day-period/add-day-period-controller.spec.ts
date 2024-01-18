import { type AddDayPeriod, type AddDayPeriodData, type AddDayPeriodResponse } from '@/domain/contracts/user'
import { type Validation } from '@/presentation/contracts'
import { type HttpRequest } from '@/presentation/types/http'
import { type Either, right, left } from '@/shared/either'
import { AddDayPeriodController } from './add-day-period-controller'
import { badRequest, serverError } from '@/presentation/helpers/http-helpers'

const makeFakeRequest = (): HttpRequest => ({
  headers: {
    userId: 'any_user_id'
  },
  body: {
    morning: true,
    afternoon: false,
    night: false
  }
})

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    async validate (input: any): Promise<Either<Error, null>> {
      return await Promise.resolve(right(null))
    }
  }
  return new ValidationStub()
}

const makeFakeAddDayPeriod = (): AddDayPeriod => {
  class AddDayPeriodStub implements AddDayPeriod {
    async perform (data: AddDayPeriodData): Promise<AddDayPeriodResponse> {
      return await Promise.resolve(right(null))
    }
  }
  return new AddDayPeriodStub()
}

type SutTypes = {
  sut: AddDayPeriodController
  validationStub: Validation
  addDayPeriodStub: AddDayPeriod
}

const makeSut = (): SutTypes => {
  const validationStub = makeValidation()
  const addDayPeriodStub = makeFakeAddDayPeriod()
  const sut = new AddDayPeriodController(validationStub, addDayPeriodStub)
  return {
    sut,
    addDayPeriodStub,
    validationStub
  }
}

describe('AddDayPeriodController', () => {
  it('Should call Validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    await sut.handle(makeFakeRequest())
    expect(validateSpy).toHaveBeenCalledWith(makeFakeRequest().body)
  })
})

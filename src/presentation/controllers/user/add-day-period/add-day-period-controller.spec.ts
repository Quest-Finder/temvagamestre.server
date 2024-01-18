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

  it('Should return 400 if Validation fails', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(
      Promise.resolve(left(new Error('any_message')))
    )
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(badRequest(new Error('any_message')))
  })

  it('Should return 500 if Validation throws', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(
      Promise.reject(new Error())
    )
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError())
  })

  it('Should call AddDayPeriod with correct values', async () => {
    const { sut, addDayPeriodStub } = makeSut()
    const performSpy = jest.spyOn(addDayPeriodStub, 'perform')
    await sut.handle(makeFakeRequest())
    expect(performSpy).toHaveBeenCalledWith({
      id: 'any_user_id',
      ...makeFakeRequest().body
    })
  })

  it('Should return 500 if AddDayPeriod throws', async () => {
    const { sut, addDayPeriodStub } = makeSut()
    jest.spyOn(addDayPeriodStub, 'perform').mockReturnValueOnce(
      Promise.reject(new Error())
    )
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError())
  })
})

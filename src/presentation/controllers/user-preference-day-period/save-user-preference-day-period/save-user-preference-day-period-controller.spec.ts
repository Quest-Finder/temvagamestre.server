import type { SaveUserPreferenceDayPeriod, SaveUserPreferenceDayPeriodData, SaveUserPreferenceDayPeriodResponse } from '@/domain/contracts/user-preference-day-period'
import type { Validation } from '@/presentation/contracts'
import { badRequest, noContent, serverError } from '@/presentation/helpers/http-helpers'
import type { HttpRequest } from '@/presentation/types/http'
import { left, right, type Either } from '@/shared/either'
import { SaveUserPreferenceDayPeriodController } from './save-user-preference-day-period-controller'

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
    validate (input: any): Either<Error, void> {
      return right()
    }
  }
  return new ValidationStub()
}

const makeFakeSaveUserPreferenceDayPeriod = (): SaveUserPreferenceDayPeriod => {
  class AddDayPeriodStub implements SaveUserPreferenceDayPeriod {
    async perform (data: SaveUserPreferenceDayPeriodData): Promise<SaveUserPreferenceDayPeriodResponse> {
      return await Promise.resolve(right())
    }
  }
  return new AddDayPeriodStub()
}

type SutTypes = {
  sut: SaveUserPreferenceDayPeriodController
  validationStub: Validation
  saveUserPreferenceDayPeriodStub: SaveUserPreferenceDayPeriod
}

const makeSut = (): SutTypes => {
  const validationStub = makeValidation()
  const saveUserPreferenceDayPeriodStub = makeFakeSaveUserPreferenceDayPeriod()
  const sut = new SaveUserPreferenceDayPeriodController(
    validationStub, saveUserPreferenceDayPeriodStub
  )
  return { sut, saveUserPreferenceDayPeriodStub, validationStub }
}

describe('SaveUserPreferenceDayPeriodController', () => {
  it('Should call Validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    await sut.handle(makeFakeRequest())
    expect(validateSpy).toHaveBeenCalledWith(makeFakeRequest().body)
  })

  it('Should return 400 if Validation fails', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(
      left(new Error('any_message'))
    )
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(badRequest(new Error('any_message')))
  })

  it('Should return 500 if Validation throws', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  it('Should call SaveUserPreferenceDayPeriod with correct values', async () => {
    const { sut, saveUserPreferenceDayPeriodStub } = makeSut()
    const performSpy = jest.spyOn(saveUserPreferenceDayPeriodStub, 'perform')
    await sut.handle(makeFakeRequest())
    expect(performSpy).toHaveBeenCalledWith({
      userId: 'any_user_id',
      ...makeFakeRequest().body
    })
  })

  it('Should return 500 if SaveUserPreferenceDayPeriod throws', async () => {
    const { sut, saveUserPreferenceDayPeriodStub } = makeSut()
    jest.spyOn(saveUserPreferenceDayPeriodStub, 'perform').mockReturnValueOnce(
      Promise.reject(new Error())
    )
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  it('Should return 204 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(noContent())
  })
})

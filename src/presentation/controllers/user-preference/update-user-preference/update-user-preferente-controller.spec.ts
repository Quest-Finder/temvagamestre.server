import type { UpdateUserPreferenceResponse, UpdateUserPreference, UpdateUserPreferenceData } from '@/domain/contracts/user-preference'
import { type Validation } from '@/presentation/contracts'
import { type HttpRequest } from '@/presentation/types/http'
import { type Either, right, left } from '@/shared/either'
import { UpdateUserPreferenceController } from './update-user-preference-controller'
import { badRequest, noContent, serverError } from '@/presentation/helpers/http-helpers'

const makeFakeRequest = (): HttpRequest => ({
  headers: {
    userId: 'any_user_id'
  },
  body: {
    activeType: 'player',
    frequency: 'weekly'
  }
})

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Either<Error, null> {
      return right(null)
    }
  }
  return new ValidationStub()
}

const makeFakeUpdateUserPreference = (): UpdateUserPreference => {
  class UpdateUserPreferenceStub implements UpdateUserPreference {
    async perform (data: UpdateUserPreferenceData): Promise<UpdateUserPreferenceResponse> {
      return await Promise.resolve(right(null))
    }
  }
  return new UpdateUserPreferenceStub()
}

type SutTypes = {
  sut: UpdateUserPreferenceController
  validationStub: Validation
  updateUserPreferenceStub: UpdateUserPreference
}

const makeSut = (): SutTypes => {
  const validationStub = makeValidation()
  const updateUserPreferenceStub = makeFakeUpdateUserPreference()
  const sut = new UpdateUserPreferenceController(validationStub, updateUserPreferenceStub)
  return { sut, validationStub, updateUserPreferenceStub }
}

describe('UpdateUserPreferenceController', () => {
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
    expect(httpResponse).toEqual(serverError())
  })

  it('Should call UpdateUserPreference with correct values', async () => {
    const { sut, updateUserPreferenceStub } = makeSut()
    const performSpy = jest.spyOn(updateUserPreferenceStub, 'perform')
    await sut.handle(makeFakeRequest())
    expect(performSpy).toHaveBeenCalledWith({
      userId: 'any_user_id',
      ...makeFakeRequest().body
    })
  })

  it('Should return 500 if UpdateUserPreference throws', async () => {
    const { sut, updateUserPreferenceStub } = makeSut()
    jest.spyOn(updateUserPreferenceStub, 'perform').mockReturnValueOnce(
      Promise.reject(new Error())
    )
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError())
  })

  it('Should return 204 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(noContent())
  })
})

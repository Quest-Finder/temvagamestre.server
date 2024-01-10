import { type AddUserPreference, type AddUserPreferenceData, type AddUserPreferenceResponse } from '@/domain/contracts/user/add-user-preference'
import { type Validation } from '@/presentation/contracts'
import { type HttpRequest } from '@/presentation/types/http'
import { right, type Either, left } from '@/shared/either'
import { AddUserPreferenceController } from './add-user-preference-controller'
import { badRequest, serverError } from '@/presentation/helpers/http-helpers'

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
    async validate (input: any): Promise<Either<Error, null>> {
      return await Promise.resolve(right(null))
    }
  }
  return new ValidationStub()
}

const makeFakeAddUserPreference = (): AddUserPreference => {
  class AddUserPreferenceStub implements AddUserPreference {
    async perform (data: AddUserPreferenceData): Promise<AddUserPreferenceResponse> {
      return await Promise.resolve(right(null))
    }
  }
  return new AddUserPreferenceStub()
}

type SutTypes = {
  sut: AddUserPreferenceController
  validationStub: Validation
  addUserPreferenceStub: AddUserPreference
}

const makeSut = (): SutTypes => {
  const validationStub = makeValidation()
  const addUserPreferenceStub = makeFakeAddUserPreference()
  const sut = new AddUserPreferenceController(validationStub, addUserPreferenceStub)
  return {
    sut,
    addUserPreferenceStub,
    validationStub
  }
}

describe('AddUserPreferenceController', () => {
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
})

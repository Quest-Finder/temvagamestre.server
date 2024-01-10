import { type AddUserPreference, type AddUserPreferenceData, type AddUserPreferenceResponse } from '@/domain/contracts/user/add-user-preference'
import { type Validation } from '@/presentation/contracts'
import { type HttpRequest } from '@/presentation/types/http'
import { right, type Either } from '@/shared/either'
import { AddUserPreferenceController } from './add-user-preference-controller'

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
})

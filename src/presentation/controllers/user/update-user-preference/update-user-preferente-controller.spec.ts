import { type UpdateUserPreferenceResponse, type UpdateUserPreference, type UpdateUserPreferenceData } from '@/domain/contracts/user'
import { type Validation } from '@/presentation/contracts'
import { type HttpRequest } from '@/presentation/types/http'
import { type Either, right } from '@/shared/either'
import { UpdateUserPreferenceController } from './update-user-preference-controller'

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
  return {
    sut,
    validationStub,
    updateUserPreferenceStub
  }
}

describe('UpdateUserPreferenceController', () => {
  it('Should call Validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    await sut.handle(makeFakeRequest())
    expect(validateSpy).toHaveBeenCalledWith(makeFakeRequest().body)
  })
})

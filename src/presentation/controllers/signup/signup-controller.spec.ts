import type { Validation } from '@/presentation/contracts'
import { ServerError } from '@/presentation/errors'
import { badRequest, serverError, type HttpRequest } from '@/presentation/http'
import { type Either, right, left } from '@/shared/either'
import { SignUpController } from './signup-controller'
import MockDate from 'mockdate'

const makeFakeRequest = (): HttpRequest => ({
  body: {
    externalAuthUserId: 'any_external_auth_user_id',
    firstName: 'any_first_name',
    lastName: 'any_last_name',
    email: 'any_email@mail.com',
    dateOfBirth: new Date()
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

interface SutTypes {
  sut: SignUpController
  validationStub: Validation
}

const makeSut = (): SutTypes => {
  const validationStub = makeValidation()
  const sut = new SignUpController(validationStub)
  return { sut, validationStub }
}

describe('SignUpController', () => {
  beforeAll(() => { MockDate.set(new Date()) })

  afterAll(() => { MockDate.reset() })

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
    jest.spyOn(validationStub, 'validate').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpResponse = await sut.handle(makeFakeRequest())
    const error = new Error()
    error.stack = 'any_stack'
    expect(httpResponse).toEqual(serverError(new ServerError(error.stack)))
  })
})

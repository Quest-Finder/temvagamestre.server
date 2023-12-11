import type { Validation } from '@/presentation/contracts'
import { WebhookControllerDecorator } from './web-hook-controller-decorator'
import { type Either, right, left } from '@/shared/either'
import type { HttpRequest } from '@/presentation/types/http'
import { badRequest, serverError } from '@/presentation/helpers/http-helpers'

const makeFakeRequest = (): HttpRequest => ({
  headers: { value: 'any_value' },
  body: { otherValue: 'any_other_value' }
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
  sut: WebhookControllerDecorator
  validationStub: Validation
}

const makeSut = (): SutTypes => {
  const validationStub = makeValidation()
  const sut = new WebhookControllerDecorator(validationStub)
  return { sut, validationStub }
}

describe('WebhookControllerDecorator', () => {
  it('Should call Validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    await sut.handle(makeFakeRequest())
    expect(validateSpy).toHaveBeenCalledWith(makeFakeRequest())
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
    const error = new Error()
    error.stack = 'any_stack'
    expect(httpResponse).toEqual(serverError())
  })
})

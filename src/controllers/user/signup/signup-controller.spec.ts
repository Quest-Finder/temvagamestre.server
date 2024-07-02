import type { AddUser, AddUserData, AddUserResponse } from '@/contracts/user'
import type { Validation } from '@/contracts'
import type { HttpRequest } from '@/types/http'
import { badRequest, noContent, serverError } from '@/helpers/http/http-helpers'
import { left, right, type Either } from '@/shared/either'
import { SignUpController } from './signup-controller'

const makeFakeRequest = (): HttpRequest => ({
  body: {
    externalAuthUserId: 'any_external_auth_user_id',
    firstName: 'any_first_name',
    lastName: 'any_last_name',
    email: 'any_email@mail.com'
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

const makeAddUser = (): AddUser => {
  class AddUserStub implements AddUser {
    async perform (account: AddUserData): Promise<AddUserResponse> {
      return await Promise.resolve(right())
    }
  }
  return new AddUserStub()
}

type SutTypes = {
  sut: SignUpController
  validationStub: Validation
  addUserStub: AddUser
}

const makeSut = (): SutTypes => {
  const validationStub = makeValidation()
  const addUserStub = makeAddUser()
  const sut = new SignUpController(validationStub, addUserStub)
  return { sut, validationStub, addUserStub }
}

describe('SignUpController', () => {
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

  it('Should call AddUser with correct values', async () => {
    const { sut, addUserStub } = makeSut()
    const performSpy = jest.spyOn(addUserStub, 'perform')
    await sut.handle(makeFakeRequest())
    expect(performSpy).toHaveBeenCalledWith(makeFakeRequest().body)
  })

  it('Should return 400 if AddUser return an Error', async () => {
    const { sut, addUserStub } = makeSut()
    jest.spyOn(addUserStub, 'perform').mockReturnValueOnce(
      Promise.resolve(left(new Error('any_message')))
    )
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(badRequest(new Error('any_message')))
  })

  it('Should return 500 if AddUser throws', async () => {
    const { sut, addUserStub } = makeSut()
    jest.spyOn(addUserStub, 'perform').mockReturnValueOnce(
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

import { type AddGamePlace, type AddGamePlaceData, type AddGamePlaceResponse } from '@/domain/contracts/user'
import { type Validation } from '@/presentation/contracts'
import { type HttpRequest } from '@/presentation/types/http'
import { type Either, right, left } from '@/shared/either'
import { AddGamePlaceController } from './add-game-place-controller'
import { badRequest, serverError } from '@/presentation/helpers/http-helpers'

const makeFakeRequest = (): HttpRequest => ({
  headers: {
    userId: 'any_user_id'
  },
  body: {
    online: true,
    inPerson: false
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

const makeFakeAddGamePlace = (): AddGamePlace => {
  class AddGamePlaceStub implements AddGamePlace {
    async perform (data: AddGamePlaceData): Promise<AddGamePlaceResponse> {
      return await Promise.resolve(right(null))
    }
  }
  return new AddGamePlaceStub()
}

type SutTypes = {
  sut: AddGamePlaceController
  validationStub: Validation
  addGamePlaceStub: AddGamePlace
}

const makeSut = (): SutTypes => {
  const validationStub = makeValidation()
  const addGamePlaceStub = makeFakeAddGamePlace()
  const sut = new AddGamePlaceController(validationStub, addGamePlaceStub)
  return {
    sut,
    addGamePlaceStub,
    validationStub
  }
}

describe('AddGamePlaceController', () => {
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

  it('Should call AddGamePlace with correct values', async () => {
    const { sut, addGamePlaceStub } = makeSut()
    const performSpy = jest.spyOn(addGamePlaceStub, 'perform')
    await sut.handle(makeFakeRequest())
    expect(performSpy).toHaveBeenCalledWith({
      id: 'any_user_id',
      ...makeFakeRequest().body
    })
  })
})

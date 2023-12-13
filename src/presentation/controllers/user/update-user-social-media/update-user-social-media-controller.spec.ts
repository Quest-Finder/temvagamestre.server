import { type Validation } from '@/presentation/contracts'
import { UpdateUserSocialMediaController } from './update-user-social-media-controller'
import { type Either, right, left } from '@/shared/either'
import { type UpdateUserSocialMedia, type UpdateUserSocialMediaData, type UpdateUserSocialMediaResponse } from '@/domain/contracts/user'
import { type HttpRequest } from '@/presentation/types/http'
import { badRequest, noContent, serverError } from '@/presentation/helpers/http-helpers'

const makeFakeRequest = (): HttpRequest => ({
  body: {
    userId: 'any_user_id',
    socialMediaId: 'any_social_media_id',
    link: 'any_link'
  }
})

const makeUpdateUserSocialMedia = (): UpdateUserSocialMedia => {
  class UpdateUserSocialMediaStub implements UpdateUserSocialMedia {
    async perform (data: UpdateUserSocialMediaData): Promise<UpdateUserSocialMediaResponse> {
      return await Promise.resolve(right(null))
    }
  }

  return new UpdateUserSocialMediaStub()
}

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    async validate (input: any): Promise<Either<Error, null>> {
      return await Promise.resolve(right(null))
    }
  }

  return new ValidationStub()
}

interface SutTypes {
  sut: UpdateUserSocialMediaController
  updateUserSocialMediaStub: UpdateUserSocialMedia
  validationStub: Validation
}

const makeSut = (): SutTypes => {
  const validationStub = makeValidation()
  const updateUserSocialMediaStub = makeUpdateUserSocialMedia()
  const sut = new UpdateUserSocialMediaController(validationStub, updateUserSocialMediaStub)
  return {
    sut,
    updateUserSocialMediaStub,
    validationStub
  }
}

describe('UpdateUserSocialMediaController', () => {
  it('Should call Validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    await sut.handle(makeFakeRequest())
    expect(validateSpy).toHaveBeenCalledWith(makeFakeRequest().body)
  })

  it('Should return 400 if Validation fails', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(Promise.resolve(left(new Error('any_message'))))

    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(badRequest(new Error('any_message')))
  })

  it('Should return 500 if Validation throws', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(Promise.resolve(Promise.reject(new Error())))
    const httpResponse = await sut.handle(makeFakeRequest())
    const error = new Error()
    error.stack = 'any_stack'
    expect(httpResponse).toEqual(serverError())
  })

  it('Should call UpdateUserSocialMedia with correct values', async () => {
    const { sut, updateUserSocialMediaStub } = makeSut()
    const performSpy = jest.spyOn(updateUserSocialMediaStub, 'perform')
    await sut.handle(makeFakeRequest())
    expect(performSpy).toHaveBeenCalledWith(makeFakeRequest().body)
  })

  it('Should return 400 if UpdateUserSocialMedia return an Error', async () => {
    const { sut, updateUserSocialMediaStub } = makeSut()
    jest.spyOn(updateUserSocialMediaStub, 'perform').mockReturnValueOnce(Promise.resolve(left(new Error('any_message'))))
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(badRequest(new Error('any_message')))
  })

  it('Should return 5000 if UpdateUserSocialMedia thros', async () => {
    const { sut, updateUserSocialMediaStub } = makeSut()
    jest.spyOn(updateUserSocialMediaStub, 'perform').mockReturnValueOnce(Promise.resolve(Promise.reject(new Error())))
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError())
  })

  it('Should return 204 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(noContent())
  })
})

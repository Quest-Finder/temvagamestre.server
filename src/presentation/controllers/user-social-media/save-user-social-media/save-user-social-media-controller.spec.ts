import { type SaveUserSocialMedia, type SaveUserSocialMediaData, type SaveUserSocialMediaResponse } from '@/domain/contracts/user-social-media'
import { type Validation } from '@/presentation/contracts'
import { badRequest, noContent, serverError } from '@/presentation/helpers/http-helpers'
import { type HttpRequest } from '@/presentation/types/http'
import { left, right, type Either } from '@/shared/either'
import { SaveUserSocialMediaController } from './save-user-social-media-controller'

const makeFakeRequest = (): HttpRequest => ({
  body: {
    socialMediaId: 'any_social_media_id',
    link: 'any_link'
  },
  headers: {
    userId: 'any_user_id'
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

const makeSaveUserSocialMedia = (): SaveUserSocialMedia => {
  class SaveUserSocialMediaStub implements SaveUserSocialMedia {
    async perform (data: SaveUserSocialMediaData): Promise<SaveUserSocialMediaResponse> {
      return await Promise.resolve(right(null))
    }
  }
  return new SaveUserSocialMediaStub()
}

type SutTypes = {
  sut: SaveUserSocialMediaController
  validationStub: Validation
  saveUserSocialMediaStub: SaveUserSocialMedia
}

const makeSut = (): SutTypes => {
  const validationStub = makeValidation()
  const saveUserSocialMediaStub = makeSaveUserSocialMedia()
  const sut = new SaveUserSocialMediaController(validationStub, saveUserSocialMediaStub)
  return { sut, validationStub, saveUserSocialMediaStub }
}

describe('SaveUserSocialMediaController', () => {
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

  it('Should call SaveUserSocialMedia with correct values', async () => {
    const { sut, saveUserSocialMediaStub } = makeSut()
    const performSpy = jest.spyOn(saveUserSocialMediaStub, 'perform')
    await sut.handle(makeFakeRequest())
    expect(performSpy).toHaveBeenCalledWith({
      userId: makeFakeRequest().headers.userId,
      ...makeFakeRequest().body
    })
  })

  it('Should return 400 if SaveUserSocialMedia returns an Error', async () => {
    const { sut, saveUserSocialMediaStub } = makeSut()
    jest.spyOn(saveUserSocialMediaStub, 'perform').mockReturnValueOnce(
      Promise.resolve(left(new Error('any_message')))
    )
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(badRequest(new Error('any_message')))
  })

  it('Should return 500 if SaveUserSocialMedia throws', async () => {
    const { sut, saveUserSocialMediaStub } = makeSut()
    jest.spyOn(saveUserSocialMediaStub, 'perform').mockReturnValueOnce(
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

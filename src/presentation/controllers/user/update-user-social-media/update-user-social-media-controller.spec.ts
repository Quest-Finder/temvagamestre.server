import { type Validation } from '@/presentation/contracts'
import { UpdateUserSocialMediaController } from './update-user-social-media-controller'
import { type Either, right, left } from '@/shared/either'
import { type UpdateUserSocialMedia, type UpdateUserSocialMediaData, type UpdateUserSocialMediaResponse } from '@/domain/contracts/user'
import { type HttpRequest } from '@/presentation/types/http'
import { badRequest } from '@/presentation/helpers/http-helpers'

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
  it('Should return 400 if Validation fails', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(Promise.resolve(left(new Error('any_message'))))

    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(badRequest(new Error('any_message')))
  })
})

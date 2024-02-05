import { type SaveUserSocialMedia } from '@/domain/contracts/user-social-media'
import type { Validation, Controller } from '@/presentation/contracts'
import { badRequest, noContent, serverError } from '@/presentation/helpers/http-helpers'
import type { HttpRequest, HttpResponse } from '@/presentation/types/http'

export class SaveUserSocialMediaController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly saveUserSocialMedia: SaveUserSocialMedia
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const validationResult = this.validation.validate(httpRequest.body)
      if (validationResult.isLeft()) {
        return badRequest(validationResult.value)
      }
      const saveUserSocialMediaResult = await this.saveUserSocialMedia.perform({
        userId: httpRequest.headers.userId,
        ...httpRequest.body
      })
      if (saveUserSocialMediaResult.isLeft()) {
        return badRequest(saveUserSocialMediaResult.value)
      }
      return noContent()
    } catch (error: any) {
      return serverError()
    }
  }
}

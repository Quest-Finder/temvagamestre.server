import { type UpdateUserSocialMedia } from '@/domain/contracts/user'
import { type Validation, type Controller } from '@/presentation/contracts'
import { badRequest, noContent, serverError } from '@/presentation/helpers/http-helpers'
import { type HttpRequest, type HttpResponse } from '@/presentation/types/http'

export class UpdateUserSocialMediaController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly updateUserSocialMedia: UpdateUserSocialMedia
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const validationResult = await this.validation.validate(httpRequest.body)
      if (validationResult.isLeft()) {
        return badRequest(validationResult.value)
      }
      const updateUserSocialMediaResult = await this.updateUserSocialMedia.perform(
        {
          userId: httpRequest.headers.userId,
          socialMediaId: httpRequest.body.socialMediaId,
          link: httpRequest.body.link
        }
      )
      if (updateUserSocialMediaResult.isLeft()) {
        return badRequest(updateUserSocialMediaResult.value)
      }
      return noContent()
    } catch (error: any) {
      return serverError()
    }
  }
}

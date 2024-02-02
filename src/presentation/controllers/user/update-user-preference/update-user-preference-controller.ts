import { type UpdateUserPreference } from '@/domain/contracts/user'
import type { Validation, Controller } from '@/presentation/contracts'
import { badRequest, noContent, serverError } from '@/presentation/helpers/http-helpers'
import type { HttpRequest, HttpResponse } from '@/presentation/types/http'

export class UpdateUserPreferenceController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly updateUserPreference: UpdateUserPreference
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const validationResult = await this.validation.validate(httpRequest.body)

      if (validationResult.isLeft()) {
        return badRequest(validationResult.value)
      }

      await this.updateUserPreference.perform({
        id: httpRequest.headers.userId,
        ...httpRequest.body
      })
      return noContent()
    } catch (error: any) {
      return serverError()
    }
  }
}

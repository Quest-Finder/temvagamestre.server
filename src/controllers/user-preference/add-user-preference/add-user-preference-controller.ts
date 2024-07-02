import { type AddUserPreference } from '@/contracts/user-preference'
import type { Controller, Validation } from '@/contracts'
import { badRequest, noContent, serverError } from '@/helpers/http/http-helpers'
import type { HttpRequest, HttpResponse } from '@/types/http'

export class AddUserPreferenceController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly addUserPreference: AddUserPreference
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const validationResult = this.validation.validate(httpRequest.body)
      if (validationResult.isLeft()) {
        return badRequest(validationResult.value)
      }
      await this.addUserPreference.perform({
        userId: httpRequest.headers.userId,
        ...httpRequest.body
      })
      return noContent()
    } catch (error: any) {
      return serverError(error)
    }
  }
}

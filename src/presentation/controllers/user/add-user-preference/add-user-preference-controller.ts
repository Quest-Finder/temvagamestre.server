import { type AddUserPreference } from '@/domain/contracts/user/add-user-preference'
import type { Controller, Validation } from '@/presentation/contracts'
import { badRequest, noContent, serverError } from '@/presentation/helpers/http-helpers'
import type { HttpRequest, HttpResponse } from '@/presentation/types/http'

export class AddUserPreferenceController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly addUserPreference: AddUserPreference
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const validationResult = await this.validation.validate(httpRequest.body)

      if (validationResult.isLeft()) {
        return badRequest(validationResult.value)
      }

      await this.addUserPreference.perform({
        id: httpRequest.headers.userId,
        ...httpRequest.body
      })
      return noContent()
    } catch (error: any) {
      return serverError()
    }
  }
}

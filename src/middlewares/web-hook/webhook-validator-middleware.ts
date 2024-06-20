import type { Middleware, Validation } from '@/contracts'
import { badRequest, noContent, serverError } from '@/helpers/http/http-helpers'
import type { HttpRequest, HttpResponse } from '@/types/http'

export class WebhookValidatorMiddleware implements Middleware {
  constructor (private readonly validation: Validation) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const validationResult = this.validation.validate(httpRequest)
      if (validationResult.isLeft()) {
        return badRequest(validationResult.value)
      }
      return noContent()
    } catch (error: any) {
      return serverError(error)
    }
  }
}

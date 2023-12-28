import type { Middleware, Validation } from '@/presentation/contracts'
import type { HttpRequest, HttpResponse } from '@/presentation/types/http'
import { badRequest, noContent, serverError } from '@/presentation/helpers/http-helpers'

export class WebhookValidatorMiddleware implements Middleware {
  constructor (private readonly validation: Validation) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const validationResult = await this.validation.validate(httpRequest)
      if (validationResult.isLeft()) {
        return badRequest(validationResult.value)
      }
      return noContent()
    } catch (error: any) {
      return serverError()
    }
  }
}

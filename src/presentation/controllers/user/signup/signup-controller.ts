import type { Validation, Controller } from '@/presentation/contracts'
import type { HttpRequest, HttpResponse } from '@/presentation/types/http'
import { badRequest, serverError } from '@/presentation/helpers/http-helpers'

export class SignUpController implements Controller {
  constructor (private readonly validation: Validation) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const validationResult = await this.validation.validate(httpRequest.body)
      if (validationResult.isLeft()) {
        return badRequest(validationResult.value)
      }
      return { statusCode: 0, body: '' }
    } catch (error: any) {
      return serverError(error)
    }
  }
}

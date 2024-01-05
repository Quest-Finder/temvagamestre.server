import type { Controller, Validation } from '@/presentation/contracts'
import { badRequest, serverError } from '@/presentation/helpers/http-helpers'
import type { HttpRequest, HttpResponse } from '@/presentation/types/http'

export class UpdateUserController implements Controller {
  constructor (
    private readonly validation: Validation
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const validationResult = await this.validation.validate(httpRequest.body)
      if (validationResult.isLeft()) {
        return badRequest(validationResult.value)
      }
      return { statusCode: 0, body: '' }
    } catch (error: any) {
      return serverError()
    }
  }
}

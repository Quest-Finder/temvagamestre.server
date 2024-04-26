import { type Controller, type Validation } from '@/presentation/contracts'
import { badRequest, noContent, serverError } from '@/presentation/helpers/http-helpers'
import { type HttpRequest, type HttpResponse } from '@/presentation/types/http'

export class CheckUsernameController implements Controller {
  constructor (private readonly validation: Validation) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const result = this.validation.validate(httpRequest.params.username)
      if (result.isLeft()) {
        return badRequest(result.value)
      }
      return noContent()
    } catch (error: any) {
      return serverError(error)
    }
  }
}

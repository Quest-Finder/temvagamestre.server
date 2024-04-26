import { type Controller, type Validation } from '@/presentation/contracts'
import { noContent, serverError } from '@/presentation/helpers/http-helpers'
import { type HttpRequest, type HttpResponse } from '@/presentation/types/http'

export class CheckUsernameController implements Controller {
  constructor (private readonly validation: Validation) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      this.validation.validate(httpRequest.params.username)
      return noContent()
    } catch (error: any) {
      return serverError(error)
    }
  }
}

import type { Controller } from '@/presentation/contracts'
import type { HttpRequest, HttpResponse } from '@/presentation/types/http'

export class LogControllerDecorator implements Controller {
  constructor (private readonly controller: Controller) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const httpResponse = await this.controller.handle(httpRequest)
    return httpResponse
  }
}

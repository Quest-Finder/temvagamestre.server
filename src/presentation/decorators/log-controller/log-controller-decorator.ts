import type { Controller } from '@/presentation/contracts'
import type { HttpRequest, HttpResponse } from '@/presentation/types/http'
import type { LogErrorRepo } from '@/usecases/contracts/db/log-error/log-error-repo'

export class LogControllerDecorator implements Controller {
  constructor (
    private readonly controller: Controller,
    private readonly logErrorRepo: LogErrorRepo
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const httpResponse = await this.controller.handle(httpRequest)
    if (httpResponse.statusCode === 500) {
      await this.logErrorRepo.execute({
        stack: httpResponse.body.stack,
        date: new Date()
      })
    }
    return httpResponse
  }
}

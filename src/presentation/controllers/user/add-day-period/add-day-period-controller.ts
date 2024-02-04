import { type AddDayPeriod } from '@/domain/contracts/user'
import type { Controller, Validation } from '@/presentation/contracts'
import { badRequest, noContent, serverError } from '@/presentation/helpers/http-helpers'
import type { HttpRequest, HttpResponse } from '@/presentation/types/http'

export class AddDayPeriodController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly addDayPeriod: AddDayPeriod
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const validationResult = await this.validation.validate(httpRequest.body)
      if (validationResult.isLeft()) {
        return badRequest(validationResult.value)
      }
      await this.addDayPeriod.perform({
        id: httpRequest.headers.userId,
        ...httpRequest.body
      })
      return noContent()
    } catch (error) {
      return serverError()
    }
  }
}

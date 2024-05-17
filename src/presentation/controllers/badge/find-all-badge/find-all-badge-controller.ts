import { type FindAllBadge } from '@/domain/contracts/badge/find-all-badge'
import { type Controller } from '@/presentation/contracts'
import { ok, serverError } from '@/presentation/helpers/http-helpers'
import { type HttpRequest, type HttpResponse } from '@/presentation/types/http'

export class FindAllBadgeController implements Controller {
  constructor (private readonly findAllBadgeUseCase: FindAllBadge) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const response = await this.findAllBadgeUseCase.perform()
    if (response.isLeft()) {
      return serverError(response.value)
    }
    return ok([])
  }
}

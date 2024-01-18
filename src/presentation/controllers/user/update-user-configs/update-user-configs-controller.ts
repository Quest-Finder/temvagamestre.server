import { type Controller } from '@/presentation/contracts'
import type { HttpRequest, HttpResponse } from '@/presentation/types/http'

export class UpdateUserConfigsController implements Controller {
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    return { body: '', statusCode: 400 }
  }
}

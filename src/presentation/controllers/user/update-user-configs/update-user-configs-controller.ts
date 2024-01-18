import { type UpdateUserConfigs } from '@/domain/contracts/user'
import { type Controller } from '@/presentation/contracts'
import type { HttpRequest, HttpResponse } from '@/presentation/types/http'

export class UpdateUserConfigsController implements Controller {
  constructor (private readonly updateUserConfigs: UpdateUserConfigs) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    await this.updateUserConfigs.perform({
      userId: httpRequest.headers.userId,
      allowMessage: httpRequest.body.allowMessage
    })
    return { body: '', statusCode: 400 }
  }
}

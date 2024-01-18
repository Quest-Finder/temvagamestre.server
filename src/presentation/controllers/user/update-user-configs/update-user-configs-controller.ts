import { type UpdateUserConfigs } from '@/domain/contracts/user'
import type { Validation, Controller } from '@/presentation/contracts'
import type { HttpRequest, HttpResponse } from '@/presentation/types/http'

export class UpdateUserConfigsController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly updateUserConfigs: UpdateUserConfigs
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    await this.validation.validate(httpRequest.body)
    if (!httpRequest.body.allowMessage) {
      return { body: '', statusCode: 400 }
    }
    const updateUserConfigsResult = await this.updateUserConfigs.perform({
      userId: httpRequest.headers.userId,
      allowMessage: httpRequest.body.allowMessage
    })
    if (updateUserConfigsResult.isLeft()) {
      return { body: updateUserConfigsResult.value, statusCode: 400 }
    }
    return { body: '', statusCode: 204 }
  }
}

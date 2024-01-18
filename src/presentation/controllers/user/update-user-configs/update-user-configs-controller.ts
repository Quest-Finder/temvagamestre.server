import { type UpdateUserConfigs } from '@/domain/contracts/user'
import type { Validation, Controller } from '@/presentation/contracts'
import { badRequest, noContent } from '@/presentation/helpers/http-helpers'
import type { HttpRequest, HttpResponse } from '@/presentation/types/http'

export class UpdateUserConfigsController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly updateUserConfigs: UpdateUserConfigs
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const validationResult = await this.validation.validate(httpRequest.body)
    if (validationResult.isLeft()) {
      return badRequest(validationResult.value)
    }
    const updateUserConfigsResult = await this.updateUserConfigs.perform({
      userId: httpRequest.headers.userId,
      allowMessage: httpRequest.body.allowMessage
    })
    if (updateUserConfigsResult.isLeft()) {
      return badRequest(updateUserConfigsResult.value)
    }
    return noContent()
  }
}

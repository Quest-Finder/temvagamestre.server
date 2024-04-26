import { type CheckUsername } from '@/domain/contracts/user/check-username'
import { type Controller, type Validation } from '@/presentation/contracts'
import { badRequest, noContent, serverError } from '@/presentation/helpers/http-helpers'
import { type HttpRequest, type HttpResponse } from '@/presentation/types/http'

export class CheckUsernameController implements Controller {
  constructor (private readonly validation: Validation, private readonly checkUsernameUseCase: CheckUsername) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { username } = httpRequest.params
      const result = this.validation.validate(username)
      if (result.isLeft()) {
        return badRequest(result.value)
      }
      const useCaseResult = await this.checkUsernameUseCase.perform(username)
      if (useCaseResult.isLeft()) {
        return badRequest(useCaseResult.value)
      }
      return noContent()
    } catch (error: any) {
      return serverError(error)
    }
  }
}

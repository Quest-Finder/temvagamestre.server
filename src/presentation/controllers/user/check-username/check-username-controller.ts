import { type CheckUsername } from '@/domain/contracts/user/check-username'
import { type Controller, type Validation } from '@/presentation/contracts'
import { badRequest, noContent, ok, serverError } from '@/presentation/helpers/http-helpers'
import { type HttpRequest, type HttpResponse } from '@/presentation/types/http'

export class CheckUsernameController implements Controller {
  constructor (private readonly validations: Validation[], private readonly checkUsernameUseCase: CheckUsername) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { username } = httpRequest.params

      for (const validation of this.validations) {
        const result = validation.validate(username)
        if (result.isLeft()) {
          return badRequest(result.value)
        }
      }
      const useCaseResult = await this.checkUsernameUseCase.perform(username)
      if (useCaseResult.isLeft()) {
        return ok(useCaseResult.value.message)
      }
      return noContent()
    } catch (error: any) {
      return serverError(error)
    }
  }
}

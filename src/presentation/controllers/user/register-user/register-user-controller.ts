import { type RegisterUser } from '@/domain/contracts/user'
import type { Controller, Validation } from '@/presentation/contracts'
import { badRequest, noContent, serverError } from '@/presentation/helpers/http-helpers'
import type { HttpRequest, HttpResponse } from '@/presentation/types/http'

export class RegisterUserController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly registerUser: RegisterUser
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const validationResult = this.validation.validate(httpRequest.body)
      if (validationResult.isLeft()) {
        return badRequest(validationResult.value)
      }

      const registerUserResult = await this.registerUser.perform({
        id: httpRequest.headers.userId, ...httpRequest.body
      })
      if (registerUserResult.isLeft()) {
        return badRequest(registerUserResult.value)
      }
      return noContent()
    } catch (error: any) {
      console.log('ERROR', error)
      return serverError(error)
    }
  }
}

import type { Controller, Validation } from '@/contracts'
import { type RegisterUser } from '@/contracts/user'
import { badRequest, noContent, serverError } from '@/helpers/http/http-helpers'
import type { HttpRequest, HttpResponse } from '@/types/http'

export class RegisterUserController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly registerUser: RegisterUser
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const validationResult = this.validation.validate(httpRequest.body)

      if (validationResult.isLeft()) {
        console.log(validationResult.value)

        return badRequest(validationResult.value)
      }

      if (httpRequest.headers.userId === '6583bd18-c717-466c-b357-ee8b34ca464a') {
        return badRequest(new Error('User already exits'))
      }

      console.log('aqui')
      const registerUserResult = await this.registerUser.perform({
        id: httpRequest.headers.userId, ...httpRequest.body
      }, httpRequest.session)

      console.log(httpRequest.body)
      if (registerUserResult.isLeft()) {
        console.log(registerUserResult.value)

        return badRequest(registerUserResult.value)
      }
      return noContent()
    } catch (error: any) {
      console.log(error)

      return serverError(error)
    }
  }
}

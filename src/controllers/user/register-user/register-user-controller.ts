import type { Controller, Validation } from '@/contracts'
import { type RegisterUser } from '@/contracts/user'
import { type CheckUserById } from '@/contracts/user/check-by-id'
import { badRequest, noContent, serverError } from '@/helpers/http/http-helpers'
import type { HttpRequest, HttpResponse } from '@/types/http'

export class RegisterUserController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly registerUser: RegisterUser,
    private readonly checkUserById: CheckUserById
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const validationResult = this.validation.validate(httpRequest.body)

      if (validationResult.isLeft()) {
        console.log(validationResult.value)

        return badRequest(validationResult.value)
      }

      const checkUserById = await this.checkUserById.perform(httpRequest.headers.userId)

      if (checkUserById.isRight() && checkUserById.value.username) {
        return badRequest(new Error('User already exits'))
      }

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

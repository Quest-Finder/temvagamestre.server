import type { AddUser } from '@/contracts/user'
import type { Controller, Validation } from '@/contracts'
import { badRequest, noContent, serverError } from '@/helpers/http/http-helpers'
import type { HttpRequest, HttpResponse } from '@/types/http'

export class SignUpWithClerkController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly addUser: AddUser
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const validationResult = this.validation.validate(httpRequest.body)
      if (validationResult.isLeft()) {
        return badRequest(validationResult.value)
      }
      const addUserResult = await this.addUser.perform(httpRequest.body)
      if (addUserResult.isLeft()) {
        return badRequest(addUserResult.value)
      }
      return noContent()
    } catch (error: any) {
      return serverError(error)
    }
  }
}

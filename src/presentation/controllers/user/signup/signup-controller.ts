import type { Validation, Controller } from '@/presentation/contracts'
import type { HttpRequest, HttpResponse } from '@/presentation/types/http'
import type { AddUser } from '@/domain/contracts/user'
import { badRequest, noContent, serverError } from '@/presentation/helpers/http-helpers'

export class SignUpController implements Controller {
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

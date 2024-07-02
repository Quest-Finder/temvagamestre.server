import type { AddFakeUser } from '@/contracts/user'
import type { Controller } from '@/contracts'
import { ok, serverError } from '@/helpers/http/http-helpers'
import type { HttpRequest, HttpResponse } from '@/types/http'

export class AddFakeUserController implements Controller {
  constructor (private readonly addFakeUser: AddFakeUser) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const token = await this.addFakeUser.perform()
      return ok(token)
    } catch (error: any) {
      return serverError(error)
    }
  }
}

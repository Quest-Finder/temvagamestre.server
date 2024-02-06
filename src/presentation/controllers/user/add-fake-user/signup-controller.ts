import type { AddFakeUser } from '@/domain/contracts/user'
import type { Controller } from '@/presentation/contracts'
import { ok, serverError } from '@/presentation/helpers/http-helpers'
import type { HttpRequest, HttpResponse } from '@/presentation/types/http'

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

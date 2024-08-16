import type { Controller } from '@/contracts'
import type { HttpRequest, HttpResponse } from '@/types'

export class AdaptSignUpWithEmailControllerDecorator {
  constructor (private readonly controller: Controller) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const signUpWithEmailData = httpRequest.body
    const { email, password } = signUpWithEmailData.data
    const formattedRequest = {
      email,
      password
    }
    httpRequest.body = formattedRequest
    return await this.controller.handle(httpRequest)
  }
}

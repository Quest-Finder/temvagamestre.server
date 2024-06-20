import type { HttpRequest, HttpResponse } from '@/types/http'
import type { Controller } from '@/contracts'
import type { ClerkSignUpEventData } from '../../types/clerk-signup-request'
import type { AddUserData } from '@/contracts/user'

export class AdaptClerkRequestSignUpControllerDecorator implements Controller {
  constructor (private readonly controller: Controller) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const clerkRequest = httpRequest.body as ClerkSignUpEventData
    /* eslint-disable @typescript-eslint/naming-convention */
    const { id, first_name, last_name, email_addresses } = clerkRequest.data
    const formattedRequest: AddUserData = {
      externalAuthUserId: id,
      name: `${first_name} ${last_name}`,
      email: email_addresses[0].email_address
    }
    httpRequest.body = formattedRequest
    return await this.controller.handle(httpRequest)
  }
}

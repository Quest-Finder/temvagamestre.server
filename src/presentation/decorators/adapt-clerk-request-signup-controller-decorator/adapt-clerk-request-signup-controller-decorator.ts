import type { HttpRequest, HttpResponse } from '@/presentation/types/http'
import type { Controller } from '@/presentation/contracts'
import type { ClerkSignUpEventData } from '../../types/clerk-signup-request'
import type { AddUserData } from '@/domain/contracts/user'

export class AdaptClerkRequestSignUpControllerDecorator implements Controller {
  constructor (private readonly controller: Controller) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const clerkRequest = httpRequest.body as ClerkSignUpEventData
    /* eslint-disable @typescript-eslint/naming-convention */
    const { id, first_name, last_name, email_addresses, phone_numbers } = clerkRequest.data
    const formatedRequest: AddUserData = {
      externalAuthUserId: id,
      firstName: first_name,
      lastName: last_name,
      email: email_addresses[0].email_address,
      ...(phone_numbers.length && { phone: phone_numbers[0] })
    }
    httpRequest.body = formatedRequest
    return await this.controller.handle(httpRequest)
  }
}

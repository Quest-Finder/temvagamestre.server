import type { HttpRequest, HttpResponse } from '../types/http'
import type { Controller } from '../contracts'
import type { ClerkSignUpEventData } from '../types/external/clerk-signup-request'
import type { AddUserData } from '@/domain/contracts/user'

export class AdaptClerkRequestSignUpControllerDecorator implements Controller {
  constructor (private readonly controller: Controller) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const clerkRequest = httpRequest.body as ClerkSignUpEventData
    const formatedRequest: AddUserData = {
      externalAuthUserId: clerkRequest.data.id,
      firstName: clerkRequest.data.first_name,
      lastName: clerkRequest.data.last_name,
      email: clerkRequest.data.email_addresses[0].email_address,
      ...(clerkRequest.data.phone_numbers.length && { phone: clerkRequest.data.phone_numbers[0] })
    }
    httpRequest.body = formatedRequest
    return await this.controller.handle(httpRequest)
  }
}

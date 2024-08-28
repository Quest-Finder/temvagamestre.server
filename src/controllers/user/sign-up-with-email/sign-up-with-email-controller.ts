import type { Controller, Validation } from '@/contracts'
import type { SignUpWithEmail } from '@/contracts/user/sign-up-with-email'
import { badRequest, noContent, serverError } from '@/helpers/http/http-helpers'
import type { HttpRequest, HttpResponse } from '@/types/http'

export class SignUpWithEmailController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly signUpWithEmail: SignUpWithEmail,
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { email } = httpRequest.body
      //const userOrNull = await this.findUserSignUpEmailRepo.execute(email)
      //if (userOrNull) {
      //  return badRequest(new EmailInUseError(email))
     // }
      const validationResult = this.validation.validate(httpRequest.body)
      if (validationResult.isLeft()) {
        return badRequest(validationResult.value)
      }
      const signUpWithEmailResult = await this.signUpWithEmail.perform(httpRequest.body)
      if (signUpWithEmailResult.isLeft()) {
        return badRequest(signUpWithEmailResult.value)
      }
      return noContent()
    } catch (error: any) {
      return serverError(error)
    }
  }
}

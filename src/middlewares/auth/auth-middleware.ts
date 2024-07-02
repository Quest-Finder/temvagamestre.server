import { type Auth } from '@/contracts/user'
import { InvalidTokenError, AccessTokenNotInformedError } from '@/errors'
import type { Middleware } from '@/contracts'
import { forbidden, ok, serverError, unauthorized } from '@/helpers/http/http-helpers'
import type { HttpRequest, HttpResponse } from '@/types/http'

export class AuthMiddleware implements Middleware {
  constructor (private readonly auth: Auth) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const accessToken = httpRequest.headers?.['x-access-token']
      if (!accessToken) {
        return unauthorized(new AccessTokenNotInformedError())
      }
      const authResult = await this.auth.perform(accessToken)
      if (authResult.isLeft()) {
        if (authResult.value instanceof InvalidTokenError) {
          return unauthorized(authResult.value)
        }
        return forbidden(authResult.value)
      }
      return ok(authResult.value)
    } catch (error: any) {
      return serverError(error)
    }
  }
}

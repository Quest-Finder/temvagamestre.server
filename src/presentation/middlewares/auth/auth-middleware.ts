import { type Auth } from '@/domain/contracts/user'
import { InvalidTokenError } from '@/domain/errors'
import type { Middleware } from '@/presentation/contracts'
import { AccessTokenNotInformedError } from '@/presentation/errors'
import { forbidden, ok, serverError, unauthorized } from '@/presentation/helpers/http-helpers'
import type { HttpRequest, HttpResponse } from '@/presentation/types/http'

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

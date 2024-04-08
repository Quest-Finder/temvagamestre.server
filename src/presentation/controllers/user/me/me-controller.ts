import { type FindUserById } from '@/domain/contracts/user'
import { type Controller } from '@/presentation/contracts'
import { forbidden, serverError } from '@/presentation/helpers/http-helpers'
import { type HttpRequest, type HttpResponse } from '@/presentation/types/http'

export class MeController implements Controller {
  constructor (private readonly findUserById: FindUserById) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const result = await this.findUserById.perform({
        userId: httpRequest.headers.userId
      })
      if (result.isLeft()) {
        return forbidden(result.value)
      }
      return await Promise.resolve({
        statusCode: 200,
        body: {
          id: 'valid_id',
          firstName: 'string',
          lastName: 'string',
          email: 'string'
        }
      })
    } catch (error: any) {
      return serverError(error)
    }
  }
}

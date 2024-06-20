import { ExternalRequestError } from '@/errors/external-request-error'
import { type HttpResponse } from '@/types/http'
import { type ExternalRequest } from '@/usecases/contracts/external-request/external-request'
import { type Options } from '../../../usecases/contracts/external-request/external-request'

export class FetchRequestAdapter implements ExternalRequest {
  async execute (url: string, options?: Options): Promise<HttpResponse> {
    const response = await fetch(url, { ...options })

    if (!response.ok) throw new ExternalRequestError(response.status, response.statusText)

    return { statusCode: response.status, body: await response.json() }
  }
}

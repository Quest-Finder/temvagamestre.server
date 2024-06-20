import { type HttpRequest, type HttpResponse } from '@/types/http'

export interface Middleware {
  handle: (httpRequest: HttpRequest) => Promise<HttpResponse>
}

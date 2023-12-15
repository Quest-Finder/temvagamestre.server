import type { HttpRequest, HttpResponse } from '../types/http'

export interface Middleware {
  handle: (httpRequest: HttpRequest) => Promise<HttpResponse>
}

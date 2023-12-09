import type { HttpRequest, HttpResponse } from '../types/http'

export interface Controller {
  handle: (httpRequest: HttpRequest) => Promise<HttpResponse>
}

import type { HttpRequest, HttpResponse } from '../http/http'

export interface Controller {
  handle: (httpRequest: HttpRequest) => Promise<HttpResponse>
}

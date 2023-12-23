import { type HttpRequest, type HttpResponse } from '@/presentation/types/http'

export interface Middleware {
  handle: (httpRequest: HttpRequest) => Promise<HttpResponse>
}

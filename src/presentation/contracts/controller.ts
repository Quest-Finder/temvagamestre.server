import type { HttpRequest, HttpResponse } from '@/presentation/types/http'

export interface Controller {
  handle: (httpRequest: HttpRequest) => Promise<HttpResponse>
}

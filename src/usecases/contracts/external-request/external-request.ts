import { type HttpResponse } from '@/presentation/types/http'

export type Options = {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  body?: any
  headers?: any
}

export interface ExternalRequest {
  execute: (url: string, options?: Options) => Promise<HttpResponse>
}

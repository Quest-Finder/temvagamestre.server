import { NestMiddlewareAdapter } from '@/adapters/nest-middleware-adapter'
import { type Middleware } from '@/contracts'

export const adaptMiddleware = (middleware: Middleware): NestMiddlewareAdapter => {
  return new NestMiddlewareAdapter(middleware)
}

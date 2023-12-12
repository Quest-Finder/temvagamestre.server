import { NestMiddlewareAdapter } from '@/main/adapters/nest-middleware-adapter'
import { type Middleware } from '@/presentation/contracts'

export const adaptMiddleware = (middleware: Middleware): NestMiddlewareAdapter => {
  return new NestMiddlewareAdapter(middleware)
}

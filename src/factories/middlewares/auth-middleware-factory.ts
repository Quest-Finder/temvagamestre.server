import { type Middleware } from '@/contracts'
import { AuthMiddleware } from '@/middlewares/auth/auth-middleware'
import { makeAuthUseCase } from '../usecases/auth/auth-usecase-factory'

export const makeAuthMiddleware = (): Middleware => {
  return new AuthMiddleware(makeAuthUseCase())
}

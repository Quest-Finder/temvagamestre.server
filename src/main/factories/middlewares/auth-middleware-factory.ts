import { type Middleware } from '@/presentation/contracts'
import { AuthMiddleware } from '@/presentation/middlewares'
import { makeAuthUseCase } from '../usecases/auth/auth-usecase-factory'

export const makeAuthMiddleware = (): Middleware => {
  return new AuthMiddleware(makeAuthUseCase())
}

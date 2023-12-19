import { type Middleware } from '@/presentation/contracts'
import { AuthMiddleware } from '@/presentation/middlewares/auth/auth-middleware'
import { AuthZodValidation } from '@/validators/user/auth/auh-zod-validation'
import { makeAuthUseCase } from '../usecases/auth/auth-usecase-factory'

export const makeAuthMiddleware = (): Middleware => {
  const validation = new AuthZodValidation()
  return new AuthMiddleware(validation, makeAuthUseCase())
}

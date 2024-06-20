import { adaptMiddleware } from '@/factories/adapters'
import { makeAuthMiddleware } from '@/factories/middlewares'
import type { NestMiddleware } from '@nestjs/common'
import type { NextFunction, Request, Response } from 'express'

export class AuthNestMiddleware implements NestMiddleware {
  async use (req: Request, res: Response, next: NextFunction): Promise<void> {
    const adaptedMiddleware = adaptMiddleware(makeAuthMiddleware())
    await adaptedMiddleware.adapt(req, res, next)
  }
}

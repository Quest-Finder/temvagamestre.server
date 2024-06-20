import type { NestMiddleware } from '@nestjs/common'
import type { NextFunction, Response, Request } from 'express'
import { adaptMiddleware } from '@/factories/adapters'
import { makeWebhookValidatorMiddleware } from '@/factories/middlewares'

export class WebhookValidatorNestMiddleware implements NestMiddleware {
  async use (req: Request, res: Response, next: NextFunction): Promise<void> {
    const middleware = makeWebhookValidatorMiddleware()
    const adaptedMiddleware = adaptMiddleware(middleware)
    await adaptedMiddleware.adapt(req, res, next)
  }
}

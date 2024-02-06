import type { NestMiddleware } from '@nestjs/common'
import type { NextFunction, Response, Request } from 'express'
import { adaptMiddleware } from '@/main/factories/adapters'
import { makeWebhookValidatorMiddleware } from '@/main/factories/middlewares'

export class WebhookValidatorNestMiddleware implements NestMiddleware {
  async use (req: Request, res: Response, next: NextFunction): Promise<void> {
    const middleware = makeWebhookValidatorMiddleware()
    const adaptedMiddleware = adaptMiddleware(middleware)
    await adaptedMiddleware.adapt(req, res, next)
  }
}

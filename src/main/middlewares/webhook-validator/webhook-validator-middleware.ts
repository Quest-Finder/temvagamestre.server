import type { NestMiddleware } from '@nestjs/common'
import type { NextFunction, Response, Request } from 'express'
import { adaptMiddleware } from '@/main/factories/adapters'
import { makeWebhookMiddleware } from '@/main/factories/middlewares/webhook-middleware-factory'

export class WebhookValidatorMiddleware implements NestMiddleware {
  async use (req: Request, res: Response, next: NextFunction): Promise<void> {
    const middleware = makeWebhookMiddleware()
    const adaptedMiddleware = adaptMiddleware(middleware)
    await adaptedMiddleware.adapt(req, res, next)
  }
}

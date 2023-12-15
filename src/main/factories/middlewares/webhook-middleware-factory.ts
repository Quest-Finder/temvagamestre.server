import { type Middleware } from '@/presentation/contracts'
import { WebhookMiddleware } from '@/presentation/middlewares/web-hook/webhook-middleware'
import { SvixWebhookValidation } from '@/validators/webhook/svix-webhook-validation'

export const makeWebhookMiddleware = (): Middleware => {
  const validation = new SvixWebhookValidation()
  return new WebhookMiddleware(validation)
}

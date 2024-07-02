import { type Middleware } from '@/contracts'
import { WebhookValidatorMiddleware } from '@/middlewares/web-hook/webhook-validator-middleware'
import { SvixWebhookValidation } from '@/webhook/svix-webhook-validation'

export const makeWebhookValidatorMiddleware = (): Middleware => {
  const validation = new SvixWebhookValidation()
  return new WebhookValidatorMiddleware(validation)
}

import { type Middleware } from '@/presentation/contracts'
import { WebhookValidatorMiddleware } from '@/presentation/middlewares'
import { SvixWebhookValidation } from '@/validators/webhook/svix-webhook-validation'

export const makeWebhookValidatorMiddleware = (): Middleware => {
  const validation = new SvixWebhookValidation()
  return new WebhookValidatorMiddleware(validation)
}

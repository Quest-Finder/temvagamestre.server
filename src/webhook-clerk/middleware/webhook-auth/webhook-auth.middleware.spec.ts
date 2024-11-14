import { WebhookAuthMiddleware } from './webhook-auth.middleware'

describe('WebhookAuthMiddleware', () => {
  it('should be defined', () => {
    expect(new WebhookAuthMiddleware()).toBeDefined()
  })
})

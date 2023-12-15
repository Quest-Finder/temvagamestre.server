export class VerifyWebhookError extends Error {
  constructor () {
    super('Failed to verify webhook')
    this.name = 'VerifyWebhookError'
  }
}

import env from '@/main/configs/env'
import type { Validation } from '@/presentation/contracts'
import { left, right, type Either } from '@/shared/either'
import { Webhook } from 'svix'
import { InvalidSvixError, VerifyWebhookError } from '../errors'
import { type SvixHeaders } from '../types/svix-headers'

export class SvixWebhookValidation implements Validation {
  validate (input: any): Either<Error, void> {
    try {
      const headers = input.headers as SvixHeaders
      const payload = JSON.stringify(input.body)
      if (!headers?.['svix-id'] || !headers['svix-signature'] || !headers['svix-timestamp']) {
        return left(new InvalidSvixError())
      }
      const wh = new Webhook(env.webhookSecret)
      wh.verify(payload, {
        'svix-id': headers['svix-id'],
        'svix-timestamp': headers['svix-timestamp'],
        'svix-signature': headers['svix-signature']
      })
      return right()
    } catch (error: any) {
      return left(new VerifyWebhookError())
    }
  }
}

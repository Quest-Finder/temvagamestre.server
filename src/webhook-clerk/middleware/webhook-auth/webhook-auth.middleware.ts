import env from '@/configs/env'
import { type ClerkSignUpEventData } from '@/types'
import { type SvixHeaders } from '@/types/svix-headers'
import { BadRequestException, Injectable, type NestMiddleware } from '@nestjs/common'
import { type Request, type Response } from 'express'
import { Webhook } from 'svix'

@Injectable()
export class WebhookAuthMiddleware implements NestMiddleware {
  use (req: Request, res: Response, next: () => void): void {
    const headers = req.headers as SvixHeaders
    const payload = JSON.stringify(req.body)
    if (!headers?.['svix-id'] || !headers['svix-signature'] || !headers['svix-timestamp']) {
      throw new BadRequestException('Webhook auth data fails')
    }
    try {
      const wh = new Webhook(env.webhookSecret as string)
      wh.verify(payload, {
        'svix-id': headers['svix-id'],
        'svix-timestamp': headers['svix-timestamp'],
        'svix-signature': headers['svix-signature']
      })
      const clerkData: ClerkSignUpEventData = req.body
      // eslint-disable-next-line @typescript-eslint/naming-convention
      const { id, first_name, last_name, email_addresses } = clerkData.data
      const formattedRequest = {
        externalAuthUserId: id,
        name: `${first_name} ${last_name}`,
        email: email_addresses[0].email_address
      }
      req.body = formattedRequest
      next()
    } catch (error: any) {
      console.error(error)
      throw new BadRequestException('Failed to verify webhook')
    }
  }
}

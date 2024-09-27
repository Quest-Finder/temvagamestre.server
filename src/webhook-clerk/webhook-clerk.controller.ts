import { ZodValidationPipePipe } from '@/shared/zod-validation-pipe/zod-validation-pipe.pipe'
import { Body, Controller, HttpCode, Post } from '@nestjs/common'
import { WebhookUserInput, webhookUserSchema } from './dto/webhook-user-dto'
import { WebhookClerkService } from './webhook-clerk.service'

@Controller('/user/signup/webhook-dev')
export class WebhookClerkController {
  constructor (private readonly webhookClerkService: WebhookClerkService) {}

  @Post()
  @HttpCode(204)
  async create (@Body(new ZodValidationPipePipe(webhookUserSchema)) data: WebhookUserInput): Promise<void> {
    await this.webhookClerkService.create(data)
  }
}

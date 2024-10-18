import { ErrorDetail } from '@/shared/dtos/error-details.dto'
import { ZodValidationPipePipe } from '@/shared/zod-validation-pipe/zod-validation-pipe.pipe'
import { Body, Controller, HttpCode, Post } from '@nestjs/common'
import { ApiResponse, ApiTags } from '@nestjs/swagger'
import { WebhookUserInput, webhookUserSchema } from './dto/webhook-user-dto'
import { WebhookClerkService } from './webhook-clerk.service'

@ApiTags('SignUp-With-Clerk')
@Controller('/user/signup/webhook')
export class WebhookClerkController {
  constructor (private readonly webhookClerkService: WebhookClerkService) {}

  @Post()
  @HttpCode(204)
  @ApiResponse({
    status: 204,
    description: 'Sucesso!'
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error: Erro interno do servidor',
    type: ErrorDetail
  })
  async create (@Body(new ZodValidationPipePipe(webhookUserSchema)) data: WebhookUserInput): Promise<void> {
    await this.webhookClerkService.create(data)
  }
}

import { PrismaService } from '@/shared/prisma/prisma.service'
import { UserRepository } from '@/users/repository/user/user-repository'
import { Module, RequestMethod, type MiddlewareConsumer, type NestModule } from '@nestjs/common'
import { WebhookAuthMiddleware } from './middleware/webhook-auth/webhook-auth.middleware'
import { WebhookClerkController } from './webhook-clerk.controller'
import { WebhookClerkService } from './webhook-clerk.service'

@Module({
  controllers: [WebhookClerkController],
  providers: [WebhookClerkService, UserRepository, PrismaService]
})
export class WebhookClerkModule implements NestModule {
  async configure (consumer: MiddlewareConsumer): Promise<void> {
    consumer
      .apply(WebhookAuthMiddleware)
      .forRoutes({ path: '/user/signup/webhook-dev', method: RequestMethod.POST })
  }
}

import { type MiddlewareConsumer, Module, type NestModule, RequestMethod } from '@nestjs/common'
import { SignUpRoute } from './signup-route'
import { WebhookValidatorMiddleware } from '@/main/middlewares'

@Module({
  controllers: [SignUpRoute]
})
export class SignUpRoutesModule implements NestModule {
  configure (consumer: MiddlewareConsumer): void {
    consumer
      .apply(WebhookValidatorMiddleware)
      .forRoutes({ path: '/signup/webhook', method: RequestMethod.POST })
  }
}

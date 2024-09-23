import { AuthNestMiddleware, WebhookValidatorNestMiddleware } from '@/middlewares'
import { type MiddlewareConsumer, Module, type NestModule, RequestMethod } from '@nestjs/common'
import { FakeUserRoutes } from './fake-user/fake-user-routes'
import { SignUpRoutes } from './signup/signup-routes'
import { UserRoutes } from './user-routes'

@Module({
  controllers: [UserRoutes, SignUpRoutes, FakeUserRoutes]
})
export class UserRoutesModule implements NestModule {
  configure (consumer: MiddlewareConsumer): void {
    consumer
      .apply(AuthNestMiddleware)
      .forRoutes({ path: '/user', method: RequestMethod.POST })
      .apply(WebhookValidatorNestMiddleware)
      .forRoutes({ path: '/user/signup/webhook', method: RequestMethod.POST })
  }
}

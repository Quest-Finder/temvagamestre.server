import { type MiddlewareConsumer, Module, type NestModule, RequestMethod } from '@nestjs/common'
import { UserRoutes } from './user-routes'
import { AuthNestMiddleware, WebhookValidatorNestMiddleware } from '@/main/middlewares'
import { SignUpRoutes } from './signup/signup-routes'
import { FakeUserRoutes } from './fake-user/fake-user-routes'

@Module({
  controllers: [UserRoutes, SignUpRoutes, FakeUserRoutes]
})
export class UserRoutesModule implements NestModule {
  configure (consumer: MiddlewareConsumer): void {
    consumer
      .apply(AuthNestMiddleware)
      .forRoutes(
        { path: '/user', method: RequestMethod.PATCH }
      )
      .apply(WebhookValidatorNestMiddleware)
      .forRoutes({ path: '/user/signup/webhook', method: RequestMethod.POST })
  }
}

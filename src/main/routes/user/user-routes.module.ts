import { AuthNestMiddleware, WebhookValidatorNestMiddleware } from '@/main/middlewares'
import { Module, RequestMethod, type MiddlewareConsumer, type NestModule } from '@nestjs/common'
import { FakeUserRoutes } from './fake-user/fake-user-routes'
import { MeRoutes } from './me/me-routes'
import { SignUpRoutes } from './signup/signup-routes'
import { UserRoutes } from './user-routes'

@Module({
  controllers: [UserRoutes, SignUpRoutes, FakeUserRoutes, MeRoutes]
})
export class UserRoutesModule implements NestModule {
  configure (consumer: MiddlewareConsumer): void {
    consumer
      .apply(AuthNestMiddleware)
      .forRoutes(
        { path: '/user', method: RequestMethod.PATCH }
      )
      .apply(AuthNestMiddleware)
      .forRoutes({
        path: '/user/me', method: RequestMethod.GET
      })
      .apply(WebhookValidatorNestMiddleware)
      .forRoutes({ path: '/user/signup/webhook', method: RequestMethod.POST })
  }
}

import { type MiddlewareConsumer, Module, type NestModule, RequestMethod } from '@nestjs/common'
import { UserPreferenceRoutes } from './user-preference-routes'
import { AuthNestMiddleware } from '@/main/middlewares'

@Module({
  controllers: [UserPreferenceRoutes]
})
export class UserPreferenceRoutesModule implements NestModule {
  configure (consumer: MiddlewareConsumer): void {
    consumer
      .apply(AuthNestMiddleware)
      .forRoutes(
        { path: '/user/preference', method: RequestMethod.POST },
        { path: '/user/preference', method: RequestMethod.PATCH }
      )
  }
}

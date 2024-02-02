import { type MiddlewareConsumer, Module, type NestModule, RequestMethod } from '@nestjs/common'
import { UserRoute } from './user-route'
import { AuthNestMiddleware } from '@/main/middlewares'

@Module({
  controllers: [UserRoute]
})
export class UserModule implements NestModule {
  configure (consumer: MiddlewareConsumer): void {
    consumer
      .apply(AuthNestMiddleware)
      .forRoutes(
        { path: '/user/social-media', method: RequestMethod.POST },
        { path: '/user', method: RequestMethod.PATCH },
        { path: '/user/preference', method: RequestMethod.POST },
        { path: '/user/preference', method: RequestMethod.PUT },
        { path: '/user/preference/day-period', method: RequestMethod.POST },
        { path: '/user/preference/game-place', method: RequestMethod.POST }
      )
  }
}

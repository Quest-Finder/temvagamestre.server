import { AuthNestMiddleware } from '@/middlewares'
import { Module, RequestMethod, type MiddlewareConsumer, type NestModule } from '@nestjs/common'
import { UserPreferenceGamePlaceRoutes } from './user-preference-game-place/user-preference-game-place-routes'

@Module({
  controllers: [
    UserPreferenceGamePlaceRoutes
  ]
})
export class UserPreferenceRoutesModule implements NestModule {
  configure (consumer: MiddlewareConsumer): void {
    consumer
      .apply(AuthNestMiddleware)
      .forRoutes(
        { path: '/user/preference/game-place', method: RequestMethod.POST }
      )
  }
}

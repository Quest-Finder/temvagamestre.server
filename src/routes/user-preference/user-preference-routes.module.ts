import { AuthNestMiddleware } from '@/middlewares'
import { Module, RequestMethod, type MiddlewareConsumer, type NestModule } from '@nestjs/common'
import { UserPreferenceDayPeriodRoutes } from './user-preference-day-period/user-preference-day-period-routes'
import { UserPreferenceGamePlaceRoutes } from './user-preference-game-place/user-preference-game-place-routes'

@Module({
  controllers: [
    UserPreferenceDayPeriodRoutes,
    UserPreferenceGamePlaceRoutes
  ]
})
export class UserPreferenceRoutesModule implements NestModule {
  configure (consumer: MiddlewareConsumer): void {
    consumer
      .apply(AuthNestMiddleware)
      .forRoutes(
        { path: '/user/preference/day-period', method: RequestMethod.POST },
        { path: '/user/preference/game-place', method: RequestMethod.POST }
      )
  }
}

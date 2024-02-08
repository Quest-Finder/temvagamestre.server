import { type MiddlewareConsumer, Module, type NestModule, RequestMethod } from '@nestjs/common'
import { UserPreferenceRoutes } from './user-preference-routes'
import { AuthNestMiddleware } from '@/main/middlewares'
import { UserPreferenceDayPeriodRoutes } from './user-preference-day-period/user-preference-day-period-routes'
import { UserPreferenceGamePlaceRoutes } from './user-preference-game-place/user-preference-game-place-routes'

@Module({
  controllers: [
    UserPreferenceRoutes,
    UserPreferenceDayPeriodRoutes,
    UserPreferenceGamePlaceRoutes
  ]
})
export class UserPreferenceRoutesModule implements NestModule {
  configure (consumer: MiddlewareConsumer): void {
    consumer
      .apply(AuthNestMiddleware)
      .forRoutes(
        { path: '/user/preference', method: RequestMethod.POST },
        { path: '/user/preference', method: RequestMethod.PATCH },
        { path: '/user/preference/day-period', method: RequestMethod.POST },
        { path: '/user/preference/game-place', method: RequestMethod.POST }
      )
  }
}

import { type MiddlewareConsumer, Module, type NestModule, RequestMethod } from '@nestjs/common'
import { UserPreferenceDayPeriodRoutes } from './user-preference-day-period-routes'
import { AuthNestMiddleware } from '@/main/middlewares'

@Module({
  controllers: [UserPreferenceDayPeriodRoutes]
})
export class UserPreferenceDayPeriodRoutesModule implements NestModule {
  configure (consumer: MiddlewareConsumer): void {
    consumer
      .apply(AuthNestMiddleware)
      .forRoutes(
        { path: '/user/preference/day-period', method: RequestMethod.POST }
      )
  }
}

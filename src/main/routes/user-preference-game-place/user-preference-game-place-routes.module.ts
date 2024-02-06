import { type MiddlewareConsumer, Module, type NestModule, RequestMethod } from '@nestjs/common'
import { UserPreferenceGamePlaceRoutes } from './user-precerence-game-place-routes'
import { AuthNestMiddleware } from '@/main/middlewares'

@Module({
  controllers: [UserPreferenceGamePlaceRoutes]
})
export class UserPreferenceGamePlaceRoutesModule implements NestModule {
  configure (consumer: MiddlewareConsumer): void {
    consumer
      .apply(AuthNestMiddleware)
      .forRoutes(
        { path: '/user/preference/game-place', method: RequestMethod.POST }
      )
  }
}

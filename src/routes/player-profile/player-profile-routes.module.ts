import { Module, RequestMethod, type MiddlewareConsumer, type NestModule } from '@nestjs/common'
import { PlayerProfileRoutes } from './player-profile-routes'

@Module({
  controllers: [PlayerProfileRoutes]
})
export class PlayerProfileRoutesModule implements NestModule {
  configure (consumer: MiddlewareConsumer): void {
    consumer
      .apply()
      .forRoutes({ path: '/players-profile', method: RequestMethod.GET })
  }
}

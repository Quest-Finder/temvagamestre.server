import { type MiddlewareConsumer, Module, type NestModule, RequestMethod } from '@nestjs/common'
import { RpgStyleRoutes } from './rpg-style-routes'

@Module({
  controllers: [RpgStyleRoutes]
})
export class RpgStyleRoutesModule implements NestModule {
  configure (consumer: MiddlewareConsumer): void {
    consumer
      .apply()
      .forRoutes({ path: '/rpg-style', method: RequestMethod.GET })
  }
}

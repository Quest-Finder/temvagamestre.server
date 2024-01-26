import { type MiddlewareConsumer, Module, type NestModule, RequestMethod } from '@nestjs/common'
import { RpgStyleRoute } from './rpg-style-route'

@Module({
  controllers: [RpgStyleRoute]
})
export class RpgStyleModule implements NestModule {
  configure (consumer: MiddlewareConsumer): void {
    consumer
      .apply()
      .forRoutes({ path: '/rpg-style', method: RequestMethod.GET })
  }
}

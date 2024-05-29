import { Module, RequestMethod, type MiddlewareConsumer, type NestModule } from '@nestjs/common'
import { BadgeRoutesController } from './badge-routes'

@Module({
  controllers: [BadgeRoutesController]
})
export class BadgeRoutesModule implements NestModule {
  configure (consumer: MiddlewareConsumer): void {
    consumer
      .apply()
      .forRoutes({ path: '/badge', method: RequestMethod.GET })
  }
}

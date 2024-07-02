import { type MiddlewareConsumer, Module, type NestModule, RequestMethod } from '@nestjs/common'
import { SocialMediaRoutes } from './social-media-routes'

@Module({
  controllers: [SocialMediaRoutes]
})
export class SocialMediaRoutesModule implements NestModule {
  configure (consumer: MiddlewareConsumer): void {
    consumer
      .apply()
      .forRoutes({ path: '/social-media', method: RequestMethod.GET })
  }
}

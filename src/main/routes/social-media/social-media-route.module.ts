import { type MiddlewareConsumer, Module, type NestModule, RequestMethod } from '@nestjs/common'
import { SocialMediaRoute } from './social-media-route'

@Module({
  controllers: [SocialMediaRoute]
})
export class SocialMediaModule implements NestModule {
  configure (consumer: MiddlewareConsumer): void {
    consumer
      .apply()
      .forRoutes({ path: '/social-media', method: RequestMethod.GET })
  }
}

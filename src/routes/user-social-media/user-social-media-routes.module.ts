import { type MiddlewareConsumer, Module, type NestModule, RequestMethod } from '@nestjs/common'
import { UserSocialMediaRoutes } from './user-social-media-routes'
import { AuthNestMiddleware } from '@/middlewares'

@Module({
  controllers: [UserSocialMediaRoutes]
})
export class UserSocialMediaRoutesModule implements NestModule {
  configure (consumer: MiddlewareConsumer): void {
    consumer
      .apply(AuthNestMiddleware)
      .forRoutes(
        { path: '/user/social-media', method: RequestMethod.POST }
      )
  }
}

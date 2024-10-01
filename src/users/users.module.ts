import { AuthMiddleware } from '@/shared/auth/auth.middleware'
import { PrismaService } from '@/shared/prisma/prisma.service'
import { SocialMediaRepository } from '@/social-media/repository/social-media-repository'
import { type MiddlewareConsumer, Module, type NestModule, RequestMethod } from '@nestjs/common'
import { UserSocialMediaRepository } from './repository/user-social-media/user-social-media-repository'
import { UserRepository } from './repository/user/user-repository'
import { UserSocialMediaService } from './service/user-social-media/user-social-media.service'
import { UserSocialMediaController } from './social-media/social-media.controller'

@Module({
  providers: [UserRepository, PrismaService, UserSocialMediaService, SocialMediaRepository, UserSocialMediaRepository],
  controllers: [UserSocialMediaController]
})
export class UsersModule implements NestModule {
  configure (consumer: MiddlewareConsumer): void {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        { path: '/user/social-media', method: RequestMethod.POST }
      )
  }
}

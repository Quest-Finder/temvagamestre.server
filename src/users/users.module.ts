import { AuthMiddleware } from '@/shared/auth/auth.middleware'
import { PrismaService } from '@/shared/prisma/prisma.service'
import { SocialMediaRepository } from '@/social-media/repository/social-media-repository'
import { Module, RequestMethod, type MiddlewareConsumer, type NestModule } from '@nestjs/common'
import { FakeUserController } from './controllers/fake-user/fake-user.controller'
import { UserSocialMediaController } from './controllers/social-media/social-media.controller'
import { UserSocialMediaRepository } from './repository/user-social-media/user-social-media-repository'
import { UserRepository } from './repository/user/user-repository'
import { FakeUserService } from './service/fake-user/fake-user.service'
import { UserSocialMediaService } from './service/user-social-media/user-social-media.service'

@Module({
  providers: [UserRepository, PrismaService, UserSocialMediaService, SocialMediaRepository, UserSocialMediaRepository, FakeUserService],
  controllers: [UserSocialMediaController, FakeUserController]
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

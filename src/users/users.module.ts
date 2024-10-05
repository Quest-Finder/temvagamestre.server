import { AuthMiddleware } from '@/shared/auth/auth.middleware'
import { PrismaService } from '@/shared/prisma/prisma.service'
import { SocialMediaRepository } from '@/social-media/repository/social-media-repository'
import { Module, RequestMethod, type MiddlewareConsumer, type NestModule } from '@nestjs/common'
import { FakeUserController } from './controllers/fake-user/fake-user.controller'
import { UserPreferenceController } from './controllers/preferences/preference/preference.controller'
import { UserSocialMediaController } from './controllers/social-media/social-media.controller'
import { UserPreferenceDayPeriodController } from './controllers/user-preference-day-period/user-preference-day-period.controller'
import { UserPreferenceDayPeriodRepository } from './repository/user-preference-day-period/user-preference-day-period-repository'
import { UserPreferenceRepository } from './repository/user-preference/user-preference.repository'
import { UserSocialMediaRepository } from './repository/user-social-media/user-social-media-repository'
import { UserRepository } from './repository/user/user-repository'
import { FakeUserService } from './service/fake-user/fake-user.service'
import { UserPreferenceDayPeriodService } from './service/user-preference-day-period/user-preference-day-period.service'
import { UserPreferenceService } from './service/user-preference/user-preference.service'
import { UserSocialMediaService } from './service/user-social-media/user-social-media.service'

@Module({
  providers: [
    UserRepository,
    PrismaService,
    UserSocialMediaService,
    SocialMediaRepository,
    UserSocialMediaRepository,
    FakeUserService,
    UserPreferenceRepository,
    UserPreferenceService,
    UserPreferenceDayPeriodRepository,
    UserPreferenceDayPeriodService
  ],
  controllers: [
    UserSocialMediaController,
    FakeUserController,
    UserPreferenceController,
    UserPreferenceDayPeriodController
  ]
})
export class UsersModule implements NestModule {
  configure (consumer: MiddlewareConsumer): void {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        { path: '/user/social-media', method: RequestMethod.POST },
        { path: '/user/preference', method: RequestMethod.POST },
        { path: '/user/preference', method: RequestMethod.PATCH },
        { path: '/user/preference/day-period', method: RequestMethod.POST }

      )
  }
}

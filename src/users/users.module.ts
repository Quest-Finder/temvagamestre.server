import { AuthMiddleware } from '@/shared/auth/auth.middleware'
import { PrismaService } from '@/shared/prisma/prisma.service'
import { SocialMediaRepository } from '@/social-media/repository/social-media-repository'
import { Module, RequestMethod, type MiddlewareConsumer, type NestModule } from '@nestjs/common'
import { FakeUserController } from './controllers/fake-user/fake-user.controller'
import { UserSocialMediaController } from './controllers/social-media/social-media.controller'
import { UserPreferenceDayPeriodController } from './controllers/user-preference-day-period/user-preference-day-period.controller'
import { UserPreferenceGamePlaceController } from './controllers/user-preference-game-place/user-preference-game-place.controller'
import { UserPreferenceController } from './controllers/user-preference/user-preference.controller'
import { UserPreferenceDayPeriodRepository } from './repository/user-preference-day-period/user-preference-day-period-repository'
import { UserPreferenceGamePlaceRepository } from './repository/user-preference-game-place/user-preference-game-place-repository'
import { UserPreferenceRepository } from './repository/user-preference/user-preference.repository'
import { UserSocialMediaRepository } from './repository/user-social-media/user-social-media-repository'
import { UserRepository } from './repository/user/user-repository'
import { FakeUserService } from './service/fake-user/fake-user.service'
import { UserPreferenceDayPeriodService } from './service/user-preference-day-period/user-preference-day-period.service'
import { UserPreferenceGamePlaceService } from './service/user-preference-game-place/user-preference-game-place.service'
import { UserPreferenceService } from './service/user-preference/user-preference.service'
import { UserSocialMediaService } from './service/user-social-media/user-social-media.service'
import { UserService } from './service/user/user.service'
import { UserController } from './controllers/user/user.controller'

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
    UserPreferenceDayPeriodService,
    UserPreferenceGamePlaceRepository,
    UserPreferenceGamePlaceService,
    UserService
  ],
  controllers: [
    UserSocialMediaController,
    FakeUserController,
    UserPreferenceController,
    UserPreferenceDayPeriodController,
    UserPreferenceGamePlaceController,
    UserController
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
        { path: '/user/preference/day-period', method: RequestMethod.POST },
        { path: '/user/preference/game-place', method: RequestMethod.POST }
      )
  }
}

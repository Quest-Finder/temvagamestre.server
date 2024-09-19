import { Module } from '@nestjs/common'
import { APP_FILTER } from '@nestjs/core'
import { CityStateModule } from './city-state/city-state.module'
import { PlayerProfileRoutesModule } from './routes/player-profile/player-profile-routes.module'
import { UserPreferenceRoutesModule } from './routes/user-preference/user-preference-routes.module'
import { UserSocialMediaRoutesModule } from './routes/user-social-media/user-social-media-routes.module'
import { UserRoutesModule } from './routes/user/user-routes.module'
import { RpgStylesModule } from './rpg-styles/rpg-styles.module'
import { AppExceptionHandlerFilter } from './shared/app-exception-handler/app-exception-handler.filter'
import { SharedModule } from './shared/shared.module'
import { SocialMediaModule } from './social-media/social-media.module'

@Module({
  imports: [
    UserRoutesModule,
    UserSocialMediaRoutesModule,
    UserPreferenceRoutesModule,
    PlayerProfileRoutesModule,
    SharedModule,
    CityStateModule,
    RpgStylesModule,
    SocialMediaModule
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AppExceptionHandlerFilter
    }
  ]
})
export class AppModule {}

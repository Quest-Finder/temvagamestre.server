import { Module } from '@nestjs/common'
import { APP_FILTER } from '@nestjs/core'
import { CityStateController } from './city-state/city-state-controller/city-state.controller'
import { CityStateModule } from './city-state/city-state.module'
import { CityStateRoutesModule } from './routes/city-state/city-state-routes.module'
import { PlayerProfileRoutesModule } from './routes/player-profile/player-profile-routes.module'
import { RpgStyleRoutesModule } from './routes/rpg-style/rpg-style-routes.module'
import { SocialMediaRoutesModule } from './routes/social-media/social-media-routes.module'
import { UserPreferenceRoutesModule } from './routes/user-preference/user-preference-routes.module'
import { UserSocialMediaRoutesModule } from './routes/user-social-media/user-social-media-routes.module'
import { UserRoutesModule } from './routes/user/user-routes.module'
import { AppExceptionHandlerFilter } from './shared/app-exception-handler/app-exception-handler.filter'
import { SharedModule } from './shared/shared.module'

@Module({
  imports: [
    UserRoutesModule,
    SocialMediaRoutesModule,
    UserSocialMediaRoutesModule,
    UserPreferenceRoutesModule,
    RpgStyleRoutesModule,
    CityStateRoutesModule,
    PlayerProfileRoutesModule,
    SharedModule,
    CityStateModule
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AppExceptionHandlerFilter
    }
  ],
  controllers: [CityStateController]
})
export class AppModule {}

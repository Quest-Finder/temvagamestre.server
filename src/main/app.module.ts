import { Module } from '@nestjs/common'
import { RpgStyleRoutesModule } from './routes/rpg-style/rpg-style-routes.module'
import { SocialMediaRoutesModule } from './routes/social-media/social-media-routes.module'
import { UserPreferenceDayPeriodRoutesModule } from './routes/user-preference-day-period/user-preference-day-period-routes.module'
import { UserPreferenceRoutesModule } from './routes/user-preference/user-preference-routes.module'
import { UserSocialMediaRoutesModule } from './routes/user-social-media/user-social-media-routes.module'
import { UserRoutesModule } from './routes/user/user-routes.module'
import { UserPreferenceGamePlaceRoutesModule } from './routes/user-preference-game-place/user-preference-game-place-routes.module'

@Module({
  imports: [
    UserRoutesModule,
    SocialMediaRoutesModule,
    UserSocialMediaRoutesModule,
    UserPreferenceRoutesModule,
    UserPreferenceDayPeriodRoutesModule,
    UserPreferenceGamePlaceRoutesModule,
    RpgStyleRoutesModule
  ]
})
export class AppModule {}

import { Module } from '@nestjs/common'
import { RpgStyleRoutesModule } from './routes/rpg-style/rpg-style-routes.module'
import { SocialMediaRoutesModule } from './routes/social-media/social-media-routes.module'
import { UserPreferenceDayPeriodRoutesModule } from './routes/user-preference-day-period/user-preference-day-period-routes.module'
import { UserPreferenceRoutesModule } from './routes/user-preference/user-preference-routes.module'
import { UserSocialMediaRoutesModule } from './routes/user-social-media/user-social-media-routes.module'
import { SignUpRoutesModule } from './routes/user/signup/signup.module'
import { UserRoutesModule } from './routes/user/user-routes.module'

@Module({
  imports: [
    UserRoutesModule,
    SignUpRoutesModule,
    SocialMediaRoutesModule,
    UserSocialMediaRoutesModule,
    UserPreferenceRoutesModule,
    UserPreferenceDayPeriodRoutesModule,
    RpgStyleRoutesModule
  ]
})
export class AppModule {}

import { Module } from '@nestjs/common'
import { CityStateRoutesModule } from './routes/city-state/city-state-routes.module'
import { RpgStyleRoutesModule } from './routes/rpg-style/rpg-style-routes.module'
import { SocialMediaRoutesModule } from './routes/social-media/social-media-routes.module'
import { UserPreferenceRoutesModule } from './routes/user-preference/user-preference-routes.module'
import { UserSocialMediaRoutesModule } from './routes/user-social-media/user-social-media-routes.module'
import { UserRoutesModule } from './routes/user/user-routes.module'
import { BadgeModule } from './routes/badge/badge-routes.module'

@Module({
  imports: [
    UserRoutesModule,
    SocialMediaRoutesModule,
    UserSocialMediaRoutesModule,
    UserPreferenceRoutesModule,
    RpgStyleRoutesModule,
    CityStateRoutesModule,
    BadgeModule
  ]
})
export class AppModule {}

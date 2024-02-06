import { Module } from '@nestjs/common'
import { SocialMediaRoutesModule } from './routes/social-media/social-media-routes.module'
import { SignUpModule } from './routes/user/signup/signup.module'
import { UserRoutesModule } from './routes/user/user-routes.module'
import { RpgStyleRoutesModule } from './routes/rpg-style/rpg-style-routes.module'
import { UserSocialMediaModule } from './routes/user-social-media/user-social-media-routes.module'
import { UserPreferenceRoutesModule } from './routes/user-preference/user-preference-routes.module'

@Module({
  imports: [
    SignUpModule,
    SocialMediaRoutesModule,
    UserRoutesModule,
    UserSocialMediaModule,
    UserPreferenceRoutesModule,
    RpgStyleRoutesModule
  ]
})
export class AppModule {}

import { Module } from '@nestjs/common'
import { SocialMediaRoutesModule } from './routes/social-media/social-media-routes.module'
import { SignUpModule } from './routes/signup/signup.module'
import { UserRoutesModule } from './routes/user/user-routes.module'
import { RpgStyleRoutesModule } from './routes/rpg-style/rpg-style-routes.module'

@Module({
  imports: [
    SignUpModule,
    SocialMediaRoutesModule,
    UserRoutesModule,
    RpgStyleRoutesModule
  ]
})
export class AppModule {}

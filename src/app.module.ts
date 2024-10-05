import { Module } from '@nestjs/common'
import { APP_FILTER } from '@nestjs/core'
import { CityStateModule } from './city-state/city-state.module'
import { PlayerProfileModule } from './player-profile/player-profile.module'
import { UserRoutesModule } from './routes/user/user-routes.module'
import { RpgStylesModule } from './rpg-styles/rpg-styles.module'
import { AppExceptionHandlerFilter } from './shared/app-exception-handler/app-exception-handler.filter'
import { SharedModule } from './shared/shared.module'
import { SocialMediaModule } from './social-media/social-media.module'
import { UsersModule } from './users/users.module'
import { WebhookClerkModule } from './webhook-clerk/webhook-clerk.module'

@Module({
  imports: [
    UserRoutesModule,
    SharedModule,
    CityStateModule,
    RpgStylesModule,
    SocialMediaModule,
    PlayerProfileModule,
    WebhookClerkModule,
    UsersModule
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AppExceptionHandlerFilter
    }
  ]
})
export class AppModule {}

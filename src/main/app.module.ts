import { Module } from '@nestjs/common'
import type { MiddlewareConsumer, NestModule } from '@nestjs/common'
import { CorsMiddleware } from '@/main/middlewares'
import { SignUpModule } from './routes/user/signup/signup.module
import { SocialMediaModule } from './routes/social-media/social-media-route.module'
import { UserRoute } from './routes/user/user-route'

@Module({
  imports: [SignUpModule, SocialMediaModule, UserRoute],
  controllers: [],
  providers: []
})
export class AppModule implements NestModule {
  configure (consumer: MiddlewareConsumer): void {
    consumer.apply(CorsMiddleware).forRoutes('*')
  }
}

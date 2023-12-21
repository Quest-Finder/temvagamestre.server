import { Module } from '@nestjs/common'
import type { MiddlewareConsumer, NestModule } from '@nestjs/common'
import { CorsNestMiddleware } from '@/main/middlewares'
import { SignUpModule } from './routes/user/signup/signup.module'
import { UserModule } from './routes/user/user-route.module'

@Module({
  imports: [SignUpModule, UserModule],
  controllers: [],
  providers: []
})
export class AppModule implements NestModule {
  configure (consumer: MiddlewareConsumer): void {
    consumer.apply(CorsNestMiddleware).forRoutes('*')
  }
}

import { AuthNestMiddleware } from '@/middlewares'
import { Module, RequestMethod, type MiddlewareConsumer, type NestModule } from '@nestjs/common'
import { UserRoutes } from './user-routes'

@Module({
  controllers: [UserRoutes]
})
export class UserRoutesModule implements NestModule {
  configure (consumer: MiddlewareConsumer): void {
    consumer
      .apply(AuthNestMiddleware)
      .forRoutes(
        { path: '/user', method: RequestMethod.POST }
      )
  }
}

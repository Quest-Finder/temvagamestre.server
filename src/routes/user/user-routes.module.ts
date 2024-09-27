import { AuthNestMiddleware } from '@/middlewares'
import { Module, RequestMethod, type MiddlewareConsumer, type NestModule } from '@nestjs/common'
import { FakeUserRoutes } from './fake-user/fake-user-routes'
import { UserRoutes } from './user-routes'

@Module({
  controllers: [UserRoutes, FakeUserRoutes]
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

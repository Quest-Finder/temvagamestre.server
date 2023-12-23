import { type MiddlewareConsumer, Module, type NestModule, RequestMethod } from '@nestjs/common'
import { UserRoute } from './user-route'

@Module({
  controllers: [UserRoute]
})
export class UserModule implements NestModule {
  configure (consumer: MiddlewareConsumer): void {
    consumer
      .apply()
      .forRoutes({ path: '/user', method: RequestMethod.POST })
  }
}

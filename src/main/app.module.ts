import { Module } from '@nestjs/common'
import { SignUpModule } from './routes/user/signup/signup.module'
import { UserModule } from './routes/user/user-route.module'

@Module({
  imports: [SignUpModule, UserModule],
  controllers: [],
  providers: []
})
export class AppModule {}

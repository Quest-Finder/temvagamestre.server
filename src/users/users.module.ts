import { SharedModule } from '@/shared/shared.module'
import { Module } from '@nestjs/common'
import { SignUpController } from './sign-up/sign-up-with-email.controller'
import { SignUpService } from './sign-up/sign-up-with-email.service'

@Module({
  controllers: [SignUpController],
  providers: [SignUpService],
  imports: [SharedModule]
})
export class UsersModule {}

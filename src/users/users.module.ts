import { SharedModule } from '@/shared/shared.module'
import { Module } from '@nestjs/common'
import { SignUpController } from './sign-up/sign-up.controller'
import { SignUpService } from './sign-up/sign-up.service'

@Module({
  controllers: [SignUpController],
  providers: [SignUpService],
  imports: [SharedModule]
})
export class UsersModule {}

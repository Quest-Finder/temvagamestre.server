import { SharedModule } from '@/shared/shared.module'
import { Module } from '@nestjs/common'
import { SignUpController } from './sign-up/sign-up-with-email.controller'
import { SignUpService } from './sign-up/sign-up-with-email.service'
import { PrismaService } from '@/shared/prisma/prisma.service'
import { UuidAdapter } from '@/infra/uuid-adapter/uuid-adapter'
import { JwtSignAdapterV2 } from '@/infra/cryptography/jwt-sign-adapter-v2'
import { JwtSignAdapter } from '@/infra/cryptography/jwt-sign-adapter'

@Module({
  controllers: [SignUpController],
  providers: [
    SignUpService,
    PrismaService,
    UuidAdapter,
    JwtSignAdapter,
    JwtSignAdapterV2
  ],
  imports: [SharedModule]
})
export class UsersModule {}

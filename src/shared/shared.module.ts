import { AppTokenValidation } from '@/shared/token-validations/impl/app-token-validation'
import { ClerkTokenValidation } from '@/shared/token-validations/impl/clerk-token-validation'
import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { ErrorLog, ErrorLogSchema } from './error-service/error.schema'
import { IbgeService } from './integration/ibge/ibge.service'
import { PrismaService } from './prisma/prisma.service'
import { type TokenValidation } from './token-validations/token-validation'

const validationFactory = {
  provide: 'TokenValidations',
  useFactory: (clerkTokenValidation: TokenValidation, appTokenValidation: TokenValidation) => [clerkTokenValidation, appTokenValidation],
  inject: [ClerkTokenValidation, AppTokenValidation]
}
@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([{ schema: ErrorLogSchema, name: ErrorLog.name }])
  ],
  providers: [
    ClerkTokenValidation,
    AppTokenValidation,
    IbgeService,
    PrismaService,
    validationFactory
  ],
  exports: [
    validationFactory
  ]
})
export class SharedModule {}

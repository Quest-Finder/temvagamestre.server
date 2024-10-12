import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { ErrorService } from './error-service/error-service.service'
import { ErrorLog, ErrorLogSchema } from './error-service/error.schema'
import { IbgeService } from './integration/ibge/ibge.service'
import { PrismaService } from './prisma/prisma.service'

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([{ schema: ErrorLogSchema, name: ErrorLog.name }])
  ],
  providers: [IbgeService, PrismaService, ErrorService]
})
export class SharedModule {}

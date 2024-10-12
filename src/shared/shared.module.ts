import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'
import { IbgeService } from './integration/ibge/ibge.service'
import { PrismaService } from './prisma/prisma.service'

@Module({
  imports: [
    HttpModule
    // MongooseModule.forFeature([{ schema: ErrorLogSchema, name: ErrorLog.name }])
  ],
  providers: [IbgeService, PrismaService]
})
export class SharedModule {}

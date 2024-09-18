import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'
import { IbgeService } from './integration/ibge/ibge.service'
import { PrismaService } from './prisma/prisma.service'

@Module({
  imports: [HttpModule],
  providers: [IbgeService, PrismaService]
})
export class SharedModule {}

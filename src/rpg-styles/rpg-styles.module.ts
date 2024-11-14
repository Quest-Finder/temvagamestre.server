import { PrismaService } from '@/shared/prisma/prisma.service'
import { Module } from '@nestjs/common'
import { RpgStylesRepository } from './repository/rpg-styles.repository'
import { RpgStylesController } from './rpg-styles.controller'
import { RpgStylesService } from './rpg-styles.service'

@Module({
  controllers: [RpgStylesController],
  providers: [RpgStylesService, RpgStylesRepository, PrismaService]
})
export class RpgStylesModule {}

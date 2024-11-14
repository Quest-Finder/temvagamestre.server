import { PrismaService } from '@/shared/prisma/prisma.service'
import { Module } from '@nestjs/common'
import { PlayerProfileController } from './player-profile.controller'
import { PlayerProfileService } from './player-profile.service'
import { PlayersProfileRepository } from './repository/player-profiles.repository'

@Module({
  controllers: [PlayerProfileController],
  providers: [PlayerProfileService, PlayersProfileRepository, PrismaService]
})
export class PlayerProfileModule {}

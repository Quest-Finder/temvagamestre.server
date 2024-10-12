import { PrismaService } from '@/shared/prisma/prisma.service'
import { Injectable } from '@nestjs/common'
import { type PlayerProfileModel } from './model/player-profile.model'

@Injectable()
export class PlayersProfileRepository {
  constructor (private readonly prismaService: PrismaService) {}

  async findAll (): Promise<PlayerProfileModel[]> {
    return await this.prismaService.playerProfile.findMany()
  }

  async findById (id: string): Promise<PlayerProfileModel | undefined> {
    const result = await this.prismaService.playerProfile.findUnique({
      where: {
        id
      }
    })
    return result ?? undefined
  }
}

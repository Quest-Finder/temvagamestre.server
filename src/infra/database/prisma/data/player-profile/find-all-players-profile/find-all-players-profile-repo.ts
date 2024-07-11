import { PrismaHelper } from '@/infra/database/prisma/helpers'
import { type PlayerProfileModel } from '@/models'
import { type FindAllPlayerProfileRepo } from '@/usecases/contracts/db/player-profile/find-all-players-profile-repo'

export class FindAllPlayersProfilePrismaRepo implements FindAllPlayerProfileRepo {
  async execute (): Promise<PlayerProfileModel[]> {
    const prismaClient = await PrismaHelper.getPrisma()
    const result = await prismaClient.playerProfile.findMany()
    return result
  }
}

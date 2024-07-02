import { type PlayerProfileModel } from '@/models'
import { type AddPlayerProfileRepo } from '@/usecases/contracts/db/player-profile/add-player-profile/add-player-profile-repo'
import { PrismaHelper } from '../../../helpers'

export class AddPlayerProfilePrismaRepo implements AddPlayerProfileRepo {
  async execute (data: PlayerProfileModel): Promise<void> {
    const prisma = await PrismaHelper.getPrisma()
    await prisma.playerProfile.upsert({ where: { name: data.name }, create: data, update: { description: data.description } })
  }
}

import { type UserPreferenceGamePlaceModel } from '@/models'
import { PrismaHelper } from '@/infra/database/prisma/helpers'
import { type SaveUserPreferenceGamePlaceRepo } from '@/usecases/contracts/db/user-preference-game-place'

export class SaveUserPreferenceGamePlacePrismaRepo implements SaveUserPreferenceGamePlaceRepo {
  async execute (data: UserPreferenceGamePlaceModel): Promise<void> {
    const { id, online, inPerson } = data
    const prisma = await PrismaHelper.getPrisma()
    await prisma.userPreferenceGamePlace.upsert({
      where: { id },
      update: { online, inPerson },
      create: data
    })
  }
}

import { type AddGamePlaceData } from '@/domain/contracts/user'
import { type AddOrUpdateGamePlaceRepo } from '@/usecases/contracts/db/user/add-or-update-game-place-repo'
import { PrismaHelper } from '../../helpers/prisma-helper'

export class AddOrUpdateGamePlacePrismaRepo implements AddOrUpdateGamePlaceRepo {
  async execute (data: AddGamePlaceData): Promise<void> {
    const { id, online, inPerson } = data
    const prisma = await PrismaHelper.getPrisma()

    await prisma.gamePlace.upsert({
      where: {
        id
      },
      update: {
        online,
        inPerson
      },
      create: data
    })
  }
}

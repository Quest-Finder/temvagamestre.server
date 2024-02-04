import { type PreferenceModel } from '@/domain/models'
import { PrismaHelper } from '../../helpers/prisma-helper'
import { type FindPreferenceByIdRepo } from '@/usecases/contracts/db/user'

export class FindPreferenceByIdPrismaRepo implements FindPreferenceByIdRepo {
  async execute (userId: string): Promise<PreferenceModel | null> {
    const prisma = await PrismaHelper.getPrisma()
    const userPreferenceOrNull = await prisma.userPreference.findUnique({
      where: {
        id: userId
      }
    })
    return userPreferenceOrNull
  }
}

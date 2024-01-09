import { type PreferenceModel } from '@/domain/models'
import { PrismaHelper } from '../../helpers/prisma-helper'
import { type FindPreferenceByIdRepo } from '@/usecases/contracts/db/user'

export class FindPreferenceIdPrismaRepo implements FindPreferenceByIdRepo {
  async execute (userId: string): Promise<PreferenceModel | null> {
    const prisma = await PrismaHelper.getPrisma()
    const userPreferencesOrNull = await prisma.preference.findUnique({
      where: {
        id: userId
      }
    })
    return userPreferencesOrNull as PreferenceModel | null
  }
}

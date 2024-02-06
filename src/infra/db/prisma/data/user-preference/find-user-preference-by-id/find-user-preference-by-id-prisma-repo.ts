import { type UserPreferenceModel } from '@/domain/models'
import { PrismaHelper } from '@/infra/db/prisma/helpers'
import { type FindUserPreferenceByIdRepo } from '@/usecases/contracts/db/user-preference'

export class FindUserPreferenceByIdPrismaRepo implements FindUserPreferenceByIdRepo {
  async execute (id: string): Promise<UserPreferenceModel | null> {
    const prisma = await PrismaHelper.getPrisma()
    const userPreferenceOrNull = await prisma.userPreference.findUnique({
      where: { id }
    })
    return userPreferenceOrNull
  }
}

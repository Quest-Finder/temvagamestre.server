import type { UpdateUserPreferenceRepo, UpdateUserPreferenceRepoData } from '@/usecases/contracts/db/user-preference'
import { PrismaHelper } from '@/infra/db/prisma/helpers/prisma-helper'

export class UpdateUserPreferencePrismaRepo implements UpdateUserPreferenceRepo {
  async execute (data: UpdateUserPreferenceRepoData): Promise<void> {
    const prisma = await PrismaHelper.getPrisma()
    const { id } = data
    await prisma.userPreference.update({ where: { id }, data })
  }
}

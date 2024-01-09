import { type UpdateUserPreferenceData } from '@/domain/contracts/user'
import { type UpdateUserPreferenceRepo } from '@/usecases/contracts/db/user'
import { PrismaHelper } from '../../helpers/prisma-helper'

export class UpdateUserPreferencePrismaRepo implements UpdateUserPreferenceRepo {
  async execute (data: UpdateUserPreferenceData): Promise<void> {
    const prisma = await PrismaHelper.getPrisma()
    const { id } = data
    await prisma.preference.update({ where: { id }, data })
  }
}

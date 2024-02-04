import { type AddUserPreferenceRepo } from '@/usecases/contracts/db/user'
import { PrismaHelper } from '@/infra/db/prisma/helpers/prisma-helper'
import { type AddUserPreferenceData } from '@/domain/contracts/user/add-user-preference'

export class AddUserPreferencePrismaRepo implements AddUserPreferenceRepo {
  async execute (data: AddUserPreferenceData): Promise<void> {
    const prisma = await PrismaHelper.getPrisma()
    await prisma.userPreference.create({ data })
  }
}

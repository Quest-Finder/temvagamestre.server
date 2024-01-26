import { type UserConfigModel } from '@/domain/models'
import { type AddOrUpdateUserConfigsRepo } from '@/usecases/contracts/db/user-configs'
import { PrismaHelper } from '../../helpers/prisma-helper'

export class AddOrUpdateUserConfigsPrismaRepo implements AddOrUpdateUserConfigsRepo {
  async execute (data: UserConfigModel): Promise<void> {
    const { id, ...userConfigContent } = data
    const prisma = await PrismaHelper.getPrisma()
    await prisma.userConfig.upsert({
      where: { id },
      update: { ...userConfigContent },
      create: { ...data }
    })
  }
}

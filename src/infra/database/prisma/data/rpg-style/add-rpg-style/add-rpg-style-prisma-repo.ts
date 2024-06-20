import { type RpgStyleModel } from '@/models'
import { PrismaHelper } from '@/infra/database/prisma/helpers'
import { type AddRpgStyleRepo } from '@/usecases/contracts/db/rpg-style'

export class AddRpgStylePrismaRepo implements AddRpgStyleRepo {
  async execute (data: RpgStyleModel): Promise<void> {
    const prisma = await PrismaHelper.getPrisma()
    await prisma.rpgStyle.create({ data })
  }
}

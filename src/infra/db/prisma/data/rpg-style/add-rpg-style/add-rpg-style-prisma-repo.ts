import { type RpgStyleModel } from '@/domain/models'
import { PrismaHelper } from '@/infra/db/prisma/helpers'
import { type AddRpgStyleRepo } from '@/usecases/contracts/db/rpg-style'

export class AddRpgStylePrismaRepo implements AddRpgStyleRepo {
  async execute (data: RpgStyleModel): Promise<void> {
    const prisma = await PrismaHelper.getPrisma()
    await prisma.rpgStyle.create({ data })
  }
}

import { type FindRpgStyleByNameRepo } from '@/usecases/contracts/db/rpg-style'
import { PrismaHelper } from '@/infra/db/prisma/helpers'
import { type RpgStyleModel } from '@/domain/models'

export class FindRpgStyleByNamePrismaRepo implements FindRpgStyleByNameRepo {
  async execute (name: string): Promise<RpgStyleModel | null> {
    const prisma = await PrismaHelper.getPrisma()
    const rpgStyleOrNull = await prisma.rpgStyle.findFirst({
      where: { name }
    })
    return rpgStyleOrNull
  }
}

import { type RpgStyleModel } from '@/models'
import { PrismaHelper } from '@/infra/database/prisma/helpers'
import { type FindManyRpgStylesRepo } from '@/usecases/contracts/db/rpg-style'

export class FindManyRpgStylesPrismaRepo implements FindManyRpgStylesRepo {
  async execute (): Promise<RpgStyleModel[]> {
    const prisma = await PrismaHelper.getPrisma()
    const rpgStylesOrEmpty = await prisma.rpgStyle.findMany()
    return rpgStylesOrEmpty
  }
}

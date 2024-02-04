import { type RpgStyleModel } from '@/domain/models'
import { PrismaHelper } from '@/infra/db/prisma/helpers/prisma-helper'
import { type FindManyRpgStylesRepo } from '@/usecases/contracts/db/rpg-style'

export class FindManyRpgStylesPrismaRepo implements FindManyRpgStylesRepo {
  async execute (): Promise<RpgStyleModel[]> {
    const prisma = await PrismaHelper.getPrisma()
    const rpgStylesOrEmpty = await prisma.rpgStyle.findMany()
    return rpgStylesOrEmpty
  }
}

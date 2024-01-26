import { type RpgStyleModel } from '@/domain/models'
import { type FindManyRpgStylesRepo } from '@/usecases/contracts/db/rpg-style/find-many-rpg-styles-repo'
import { PrismaHelper } from '../../helpers/prisma-helper'

export class FindManyRpgStylesPrismaRepo implements FindManyRpgStylesRepo {
  async execute (): Promise<RpgStyleModel[] | []> {
    const prisma = await PrismaHelper.getPrisma()
    const rpgStylesOrEmpty = await prisma.rpgStyle.findMany()

    return rpgStylesOrEmpty
  }
}

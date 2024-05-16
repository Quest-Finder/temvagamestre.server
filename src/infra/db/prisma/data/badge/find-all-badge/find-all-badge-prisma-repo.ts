import { type BadgeModel } from '@/domain/models/badge/badge-model'
import { PrismaHelper } from '@/infra/db/prisma/helpers'
import { type FindAllBadgeRepo } from '@/usecases/contracts/db/badge/find-all-badge-repo'

export class FindAllBadgePrismaRepo implements FindAllBadgeRepo {
  async execute (): Promise<BadgeModel[]> {
    const prisma = await PrismaHelper.getPrisma()
    return await prisma.badge.findMany()
  }
}

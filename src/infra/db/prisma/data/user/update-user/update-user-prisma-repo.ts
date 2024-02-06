import type { UpdateUserRepo, UpdateUserRepoData } from '@/usecases/contracts/db/user'
import { PrismaHelper } from '@/infra/db/prisma/helpers'

export class UpdateUserPrismaRepo implements UpdateUserRepo {
  async execute (data: UpdateUserRepoData): Promise<void> {
    const prisma = await PrismaHelper.getPrisma()
    const { id } = data
    await prisma.user.update({ where: { id }, data })
  }
}

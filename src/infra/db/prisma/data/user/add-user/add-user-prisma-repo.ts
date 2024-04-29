import type { UserModel } from '@/domain/models'
import { PrismaHelper } from '@/infra/db/prisma/helpers'
import type { AddUserRepo } from '@/usecases/contracts/db/user'

export class AddUserPrismaRepo implements AddUserRepo {
  async execute (data: UserModel): Promise<void> {
    const prisma = await PrismaHelper.getPrisma()
    await prisma.user.create({ data })
  }
}

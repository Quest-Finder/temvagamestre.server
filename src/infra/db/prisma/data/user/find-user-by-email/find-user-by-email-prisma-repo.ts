import type { UserModel } from '@/domain/models'
import { PrismaHelper } from '@/infra/db/prisma/helpers'

export class FindUserByEmailPrismaRepo {
  async execute (email: string): Promise<UserModel | null> {
    const prisma = await PrismaHelper.getPrisma()
    const userOrNull = await prisma.user.findUnique({ where: { email } })
    return userOrNull
  }
}

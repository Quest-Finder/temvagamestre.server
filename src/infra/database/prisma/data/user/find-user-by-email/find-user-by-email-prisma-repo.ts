import type { UserModel } from '@/models'
import { PrismaHelper } from '@/infra/database/prisma/helpers'

export class FindUserByEmailPrismaRepo {
  async execute (email: string): Promise<UserModel | null> {
    const prisma = await PrismaHelper.getPrisma()
    const userOrNull = await prisma.user.findUnique({ where: { email } })
    return userOrNull
  }
}

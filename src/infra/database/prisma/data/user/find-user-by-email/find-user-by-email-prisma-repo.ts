import { PrismaHelper } from '@/infra/database/prisma/helpers'
import type { UserModel } from '@/models'
import { type FindUserByEmailRepo } from '@/usecases/contracts/db/user'

export class FindUserByEmailPrismaRepo implements FindUserByEmailRepo {
  async execute (email: string): Promise<UserModel | null> {
    const prisma = await PrismaHelper.getPrisma()
    const userOrNull = await prisma.user.findUnique({ where: { email } })
    return userOrNull
  }
}

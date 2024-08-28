import { PrismaHelper } from '@/infra/database/prisma/helpers'
import { type UserModel } from '@/models'
import { type FindUserByIdRepo } from '@/usecases/contracts/db/user/find-user-by-id-repo'

export class FindUserByIdPrismaRepo implements FindUserByIdRepo {
  async execute (id: string): Promise<UserModel | null > {
    const prisma = await PrismaHelper.getPrisma()
    const userOrNull = await prisma.user.findUnique({ where: { id } })
    return userOrNull
  }
}

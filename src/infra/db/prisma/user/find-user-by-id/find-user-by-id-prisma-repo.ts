import { type UserModel } from '@/domain/models'
import { type FindUserByIdRepo } from '@/usecases/contracts/db/user'
import { PrismaHelper } from '../../helpers/prisma-helper'

export class FindUserByIdPrismaRepo implements FindUserByIdRepo {
  async execute (id: string): Promise<UserModel | null> {
    const prisma = await PrismaHelper.getPrisma()
    const userOrNull = await prisma.user.findUnique({ where: { id } })
    return userOrNull
  }
}

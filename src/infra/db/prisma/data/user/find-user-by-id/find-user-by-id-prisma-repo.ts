import { type UserModel } from '@/domain/models'
import { PrismaHelper } from '@/infra/db/prisma/helpers'
import { type FindUserByIdRepo } from '@/usecases/contracts/db/user'

export class FindUserByIdPrismaRepo implements FindUserByIdRepo {
  async execute (userId: string): Promise<UserModel | null> {
    await PrismaHelper.getPrisma()
    return null
  }
}

import type { UserModel } from '@/models'
import { PrismaHelper } from '@/infra/database/prisma/helpers'
import type { AddUserRepo } from '@/usecases/contracts/db/user'

export class AddUserPrismaRepo implements AddUserRepo {
  async execute (data: UserModel): Promise<void> {
    const prisma = await PrismaHelper.getPrisma()
    await prisma.user.create({
      data: {
        ...data,
        authId: data.authId ?? ''
      }
    })
  }
}

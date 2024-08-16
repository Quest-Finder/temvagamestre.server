import type { UserWithEmailModel } from '@/models/user-with-email-model'
import type { SignUpWithEmailRepo } from '@/usecases/contracts/db/user/sign-up-with-email-repo'
import { PrismaHelper } from '../../../helpers'

export class SignUpWithEmailPrismaRepo implements SignUpWithEmailRepo {
  async execute (data: UserWithEmailModel): Promise<void> {
    const prisma = await PrismaHelper.getPrisma()
    await prisma.userWithEmail.create({ data }) // TODO: create a userWithEmail model in prisma
  }
}

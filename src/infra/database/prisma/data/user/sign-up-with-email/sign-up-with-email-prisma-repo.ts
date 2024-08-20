import type { UserWithEmailModel } from '@/models/user-with-email-model'
import type { SignUpWithEmailRepo } from '@/usecases/contracts/db/user/sign-up-with-email-repo'
import { PrismaHelper } from '../../../helpers'
import { UuidAdapter } from '@/infra/uuid-adapter/uuid-adapter'

export class SignUpWithEmailPrismaRepo implements SignUpWithEmailRepo {
  async execute (data: UserWithEmailModel): Promise<void> {
    const id = new UuidAdapter().build()
    const prisma = await PrismaHelper.getPrisma()
    const userData = { ...data, id }
    await prisma.userWithEmail.create({ data: userData })
  }
}

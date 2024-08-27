import type { UserWithEmailModel } from '@/models/user-with-email-model'
import type { SaveWithEmailRepo } from '@/usecases/contracts/db/user/save-with-email-repo'
import { PrismaHelper } from '../../../helpers'
import { UuidAdapter } from '@/infra/uuid-adapter/uuid-adapter'

export class SignUpWithEmailPrismaRepo implements SaveWithEmailRepo {
  async execute (data: UserWithEmailModel): Promise<void> {
    const id = new UuidAdapter().build()
    const prisma = await PrismaHelper.getPrisma()
    const userData = { ...data, id }
    await prisma.userWithEmail.create({ data: userData })
  }
}

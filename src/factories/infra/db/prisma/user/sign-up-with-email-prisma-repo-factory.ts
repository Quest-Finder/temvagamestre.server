import { SignUpWithEmailPrismaRepo } from '@/infra/database/prisma/data/user/sign-up-with-email/sign-up-with-email-prisma-repo'
import type { SaveWithEmailRepo } from '@/usecases/contracts/db/user/save-with-email-repo'

export const makeSignUpWithEmailPrismaRepo = (): SaveWithEmailRepo => {
  return new SignUpWithEmailPrismaRepo()
}

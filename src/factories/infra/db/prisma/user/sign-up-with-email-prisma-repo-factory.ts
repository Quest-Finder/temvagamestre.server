import { SignUpWithEmailPrismaRepo } from '@/infra/database/prisma/data/user/sign-up-with-email/sign-up-with-email-prisma-repo'
import type { SignUpWithEmailRepo } from '@/usecases/contracts/db/user/sign-up-with-email-repo'

export const makeSignUpWithEmailPrismaRepo = (): SignUpWithEmailRepo => {
  return new SignUpWithEmailPrismaRepo()
}

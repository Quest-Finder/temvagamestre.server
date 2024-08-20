import type { SignUpWithEmail } from '@/contracts/user/sign-up-with-email'
import { makeFindUserByEmailPrismaRepo } from '@/factories/infra/db/prisma/user/find-user-by-email-prisma-repo-factory'
import { makeSignUpWithEmailPrismaRepo } from '@/factories/infra/db/prisma/user/sign-up-with-email-prisma-repo-factory'
import { SignUpWithEmailUseCase } from '@/usecases/implementations/user/sign-up-with-email/sign-up-with-email-usecase'

export const makeAddUserWithEmailUseCase = (): SignUpWithEmail => {
  // I need to check how to include id here
  return new SignUpWithEmailUseCase(
    makeFindUserByEmailPrismaRepo(),
    makeSignUpWithEmailPrismaRepo()
  )
}

import { FindUserByEmailPrismaRepo } from '@/infra/db/prisma/user/find-user-by-email/find-user-by-email-prisma-repo'
import { type FindUserByEmailRepo } from '@/usecases/contracts/db/user'

export const makeFindUserByEmailPrismaRepo = (): FindUserByEmailRepo => {
  return new FindUserByEmailPrismaRepo()
}

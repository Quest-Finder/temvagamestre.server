import { FindUserPreferenceByIdPrismaRepo } from '@/infra/database/prisma/data/user-preference/find-user-preference-by-id/find-user-preference-by-id-prisma-repo'
import { type FindUserPreferenceByIdRepo } from '@/usecases/contracts/db/user-preference'

export const makeFindUserPreferenceByIdPrismaRepo = (): FindUserPreferenceByIdRepo => {
  return new FindUserPreferenceByIdPrismaRepo()
}

import { FindPreferenceByIdPrismaRepo } from '@/infra/db/prisma/data/user-preference/find-preference-by-id/find-preference-by-id-prisma-repo'
import { type FindPreferenceByIdRepo } from '@/usecases/contracts/db/user'

export const makeFindPreferenceByIdPrismaRepo = (): FindPreferenceByIdRepo => {
  return new FindPreferenceByIdPrismaRepo()
}

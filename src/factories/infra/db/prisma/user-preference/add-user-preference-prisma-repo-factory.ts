import { AddUserPreferencePrismaRepo } from '@/infra/database/prisma/data/user-preference/add-user-preference/add-user-preference-prisma-repo'
import { type AddUserPreferenceRepo } from '@/usecases/contracts/db/user-preference'

export const makeAddUserPreferencePrismaRepo = (): AddUserPreferenceRepo => {
  return new AddUserPreferencePrismaRepo()
}

import { AddUserPreferencePrismaRepo } from '@/infra/db/prisma/data/user-preference/add-user-preference/add-user-preference-prisma-repo'
import { type AddUserPreferenceRepo } from '@/usecases/contracts/db/user'

export const makeAddUserPreferencePrismaRepo = (): AddUserPreferenceRepo => {
  return new AddUserPreferencePrismaRepo()
}

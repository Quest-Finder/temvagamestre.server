import { UpdateUserPreferencePrismaRepo } from '@/infra/db/prisma/user/update-user-preferences/update-user-preference-prisma-repo'
import { type UpdateUserPreferenceRepo } from '@/usecases/contracts/db/user'

export const makeUpdateUserPreferenceRepo = (): UpdateUserPreferenceRepo => {
  return new UpdateUserPreferencePrismaRepo()
}

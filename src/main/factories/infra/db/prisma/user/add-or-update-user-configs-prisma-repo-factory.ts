import { AddOrUpdateUserConfigsPrismaRepo } from '@/infra/db/prisma/user/add-or-update-user-configs/add-or-update-user-configs-prisma-repo'
import { type AddOrUpdateUserConfigsRepo } from '@/usecases/contracts/db/user-configs'

export const makeAddOrUpdateUserConfigsPrismaRepo = (): AddOrUpdateUserConfigsRepo => {
  return new AddOrUpdateUserConfigsPrismaRepo()
}

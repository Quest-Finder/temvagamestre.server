import { type UpdateUserConfigs } from '@/domain/contracts/user/update-user-configs'
import { UpdateUserConfigsUseCase } from '@/usecases/implementations/user/update-user-configs/update-user-configs-usecase'
import { makeFindUserByIdPrismaRepo } from '../../infra/db/prisma/user/find-user-by-id-prisma-repo-factory'
import { makeAddOrUpdateUserConfigsPrismaRepo } from '../../infra/db/prisma/user/add-or-update-user-configs-prisma-repo-factory'

export const makeUpdateUserConfigsUseCase = (): UpdateUserConfigs => {
  return new UpdateUserConfigsUseCase(
    makeFindUserByIdPrismaRepo(),
    makeAddOrUpdateUserConfigsPrismaRepo()
  )
}

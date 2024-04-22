import { type AddUser } from '@/domain/contracts/user'
import { AddUserUseCase } from '@/usecases/implementations/user/add-user/add-user-usecase'
import { makeAddExternalAuthMappingPrismaRepo } from '../../infra/db/prisma/external-auth-mapping/add-external-auth-mapping-prisma-repo-factory'
import { makeAddUserPrismaRepo } from '../../infra/db/prisma/user/add-user-prisma-repo-factory'
import { makeFindUserByEmailPrismaRepo } from '../../infra/db/prisma/user/find-user-by-email-prisma-repo-factory'
import { makeUuidAdapter } from '../../infra/id/uuid-adapter-factory'

export const makeAddUserUseCase = (): AddUser => {
  return new AddUserUseCase(
    makeFindUserByEmailPrismaRepo(),
    makeUuidAdapter(),
    makeAddUserPrismaRepo(),
    makeAddExternalAuthMappingPrismaRepo()
  )
}

import { type AddUser } from '@/domain/contracts/user'
import { AddUserUseCase } from '@/usecases/implementations/user/add-user/add-user-usecase'
import { makeFindUserByEmailPrismaRepo } from '../../infra/db/prisma/user/find-user-by-email-prisma-repo-factory'
import { makeUuidAdapter } from '../../infra/id/uuid-adapter-factory'
import { makeAddUserPrismaRepo } from '../../infra/db/prisma/user/add-user-prisma-repo-factory'
import { makeAddExternalAuthMappingPrismaRepo } from '../../infra/db/prisma/external-auth-mapping/add-external-auth-mapping-prisma-repo-factory'

export const makeAddUserUseCase = (): AddUser => {
  return new AddUserUseCase(
    makeFindUserByEmailPrismaRepo(),
    makeUuidAdapter(),
    makeAddUserPrismaRepo(),
    makeAddExternalAuthMappingPrismaRepo()
  )
}

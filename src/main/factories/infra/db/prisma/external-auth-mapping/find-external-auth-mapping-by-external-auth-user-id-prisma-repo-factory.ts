import { FindExternalAuthMappingByExternalAuthUserIdPrismaRepo } from '@/infra/db/prisma/external-auth-mapping/find-external-auth-mapping/find-external-auth-mapping-by-external-auth-user-id-prisma-repo'
import { type FindExternalAuthMappingByExternalAuthUserIdRepo } from '@/usecases/contracts/db/external-auth-mapping'

export const makeFindExternalAuthMappingByExternalAuthUserIdPrismaRepo = (): FindExternalAuthMappingByExternalAuthUserIdRepo => {
  return new FindExternalAuthMappingByExternalAuthUserIdPrismaRepo()
}

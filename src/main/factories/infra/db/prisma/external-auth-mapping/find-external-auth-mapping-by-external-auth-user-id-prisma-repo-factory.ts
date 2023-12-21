import { FindExternalAuthMappingByExternalAuthUserIdPrismaRepo } from '@/infra/db/prisma/external-auth-mapping'
import { type FindExternalAuthMappingByExternalAuthUserIdRepo } from '@/usecases/contracts/db/external-auth-mapping'

export const makeFindExternalAuthMappingByExternalAuthUserIdPrismaRepo = (): FindExternalAuthMappingByExternalAuthUserIdRepo => {
  return new FindExternalAuthMappingByExternalAuthUserIdPrismaRepo()
}

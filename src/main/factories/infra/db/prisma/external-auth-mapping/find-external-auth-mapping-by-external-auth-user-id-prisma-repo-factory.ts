import { FindExternalAuthMappingByExternalAuthUserIdPrismaRepo } from '@/infra/db/prisma/data/external-auth-mapping'
import { type FindExternalAuthMappingByExternalAuthUserIdRepo } from '@/usecases/contracts/db/external-auth-mapping'

export const makeFindExternalAuthMappingByExternalAuthUserIdPrismaRepo = (): FindExternalAuthMappingByExternalAuthUserIdRepo => {
  return new FindExternalAuthMappingByExternalAuthUserIdPrismaRepo()
}

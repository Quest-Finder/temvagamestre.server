import { AddExternalAuthMappingPrismaRepo } from '@/infra/database/prisma/data/external-auth-mapping'
import { type AddExternalAuthMappingRepo } from '@/usecases/contracts/db/external-auth-mapping'

export const makeAddExternalAuthMappingPrismaRepo = (): AddExternalAuthMappingRepo => {
  return new AddExternalAuthMappingPrismaRepo()
}

import type { ExternalAuthMappingModel } from '@/domain/models'
import { PrismaHelper } from '@/infra/db/prisma/helpers/prisma-helper'
import type { FindExternalAuthMappingByExternalAuthUserIdRepo } from '@/usecases/contracts/db/external-auth-mapping'

export class FindExternalAuthMappingByExternalAuthUserIdPrismaRepo implements FindExternalAuthMappingByExternalAuthUserIdRepo {
  async execute (externalAuthUserId: string): Promise<null | ExternalAuthMappingModel> {
    const prisma = await PrismaHelper.getPrisma()
    return await prisma.externalAuthMapping.findUnique({ where: { externalAuthUserId } })
  }
}

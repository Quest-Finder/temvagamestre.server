import type { ExternalAuthMappingModel } from '@/models'
import type { AddExternalAuthMappingRepo } from '@/usecases/contracts/db/external-auth-mapping'
import { PrismaHelper } from '@/infra/database/prisma/helpers'

export class AddExternalAuthMappingPrismaRepo implements AddExternalAuthMappingRepo {
  async execute (data: ExternalAuthMappingModel): Promise<void> {
    const prisma = await PrismaHelper.getPrisma()
    await prisma.externalAuthMapping.create({ data })
  }
}

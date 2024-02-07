import { type SocialMediaModel } from '@/domain/models/social-media/social-media-model'
import { type FindSocialMediaByIdRepo } from '@/usecases/contracts/db/social-media/find-social-media-by-id-repo'
import { PrismaHelper } from '@/infra/db/prisma/helpers/prisma-helper'

export class FindSocialMediaByIdPrismaRepo implements FindSocialMediaByIdRepo {
  async execute (id: string): Promise<null | SocialMediaModel> {
    const prisma = await PrismaHelper.getPrisma()
    const socialMediaOrNull = await prisma.socialMedia.findUnique({ where: { id } })
    return socialMediaOrNull
  }
}

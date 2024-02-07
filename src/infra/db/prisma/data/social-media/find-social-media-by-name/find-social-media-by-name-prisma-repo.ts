import { type SocialMediaModel } from '@/domain/models/social-media/social-media-model'
import { type FindSocialMediaByNameRepo } from '@/usecases/contracts/db/social-media/find-social-media-by-name-repo'
import { PrismaHelper } from '@/infra/db/prisma/helpers'

export class FindSocialMediaByNamePrismaRepo implements FindSocialMediaByNameRepo {
  async execute (name: string): Promise<SocialMediaModel | null> {
    const prisma = await PrismaHelper.getPrisma()
    const socialMediaOrNull = await prisma.socialMedia.findFirst({ where: { name } })
    return socialMediaOrNull
  }
}

import { type SocialMediaModel } from '@/models/social-media-model'
import { type FindManySocialMediasRepo } from '@/usecases/contracts/db/social-media'
import { PrismaHelper } from '@/infra/database/prisma/helpers'

export class FindManySocialMediasPrismaRepo implements FindManySocialMediasRepo {
  async execute (): Promise<SocialMediaModel[]> {
    const prisma = await PrismaHelper.getPrisma()
    const socialMediasOrEmpty = await prisma.socialMedia.findMany()
    return socialMediasOrEmpty
  }
}

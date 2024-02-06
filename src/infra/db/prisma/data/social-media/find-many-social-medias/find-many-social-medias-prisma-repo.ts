import { type SocialMediaModel } from '@/domain/models/social-media/social-media-model'
import { type FindManySocialMediasRepo } from '@/usecases/contracts/db/social-media'
import { PrismaHelper } from '@/infra/db/prisma/helpers'

export class FindManySocialMediasPrismaRepo implements FindManySocialMediasRepo {
  async execute (): Promise<SocialMediaModel[]> {
    const prisma = await PrismaHelper.getPrisma()
    const socialMediasOrEmpty = await prisma.socialMedia.findMany()
    return socialMediasOrEmpty
  }
}

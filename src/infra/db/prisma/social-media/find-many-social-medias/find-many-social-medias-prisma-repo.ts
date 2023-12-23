import { type SocialMediaModel } from '@/domain/models/social-media/social-media-model'
import { PrismaHelper } from '../../helpers/prisma-helper'
import { type FindManySocialMediasRepo } from '@/usecases/contracts/db/social-media'

export class FindManySocialMediasPrismaRepo implements FindManySocialMediasRepo {
  async execute (): Promise<SocialMediaModel[] | []> {
    const prisma = await PrismaHelper.getPrisma()

    const socialMediasOrEmpty = await prisma.socialMedia.findMany()

    return socialMediasOrEmpty
  }
}

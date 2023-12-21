import { type SocialMediaModel } from '@/domain/models/social-media/social-media-model'
import { type AddSocialMediaRepo } from '@/usecases/contracts/db/social-media'
import { PrismaHelper } from '../../helpers/prisma-helper'

export class AddSocialMediaPrismaRepo implements AddSocialMediaRepo {
  async execute (data: SocialMediaModel): Promise<void> {
    const prisma = await PrismaHelper.getPrisma()
    await prisma.socialMedia.create({ data })
  }
}

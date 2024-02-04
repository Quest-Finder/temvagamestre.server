import { type AddOrUpdateUserSocialMediaByIdsRepo } from '@/usecases/contracts/db/user/add-or-update-user-social-media-by-ids-repo'
import { PrismaHelper } from '@/infra/db/prisma/helpers/prisma-helper'
import { type UpdateUserSocialMediaData } from '@/domain/contracts/user'

export class AddOrUpdateUserSocialMediaByIdsPrismaRepo implements AddOrUpdateUserSocialMediaByIdsRepo {
  async execute (data: UpdateUserSocialMediaData): Promise<void> {
    const { userId, socialMediaId, link } = data
    const prisma = await PrismaHelper.getPrisma()

    await prisma.userSocialMedia.upsert({
      where: {
        userId_socialMediaId: { userId, socialMediaId }
      },
      update: { link },
      create: { userId, socialMediaId, link }
    })
  }
}

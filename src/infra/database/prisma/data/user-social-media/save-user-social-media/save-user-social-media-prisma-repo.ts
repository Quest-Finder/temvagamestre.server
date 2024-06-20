import { type UserSocialMediaModel } from '@/models'
import { type SaveUserSocialMediaRepo } from '@/usecases/contracts/db/user-social-media'
import { PrismaHelper } from '@/infra/database/prisma/helpers'

export class SaveUserSocialMediaPrismaRepo implements SaveUserSocialMediaRepo {
  async execute (data: UserSocialMediaModel): Promise<void> {
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

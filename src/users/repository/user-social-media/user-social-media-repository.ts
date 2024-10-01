import { PrismaService } from '@/shared/prisma/prisma.service'
import { Injectable } from '@nestjs/common'
import { type UserSocialMediaModel } from '../entity/user-social-media.model'

export type CreateUserSocialMedia = {
  userId: string
  socialMediaId: string
  link: string
}

@Injectable()
export class UserSocialMediaRepository {
  constructor (private readonly prismaService: PrismaService) { }

  async save (data: CreateUserSocialMedia): Promise<UserSocialMediaModel | undefined> {
    const result = await this.prismaService.userSocialMedia.create({
      data: {
        link: data.link,
        socialMediaId: data.socialMediaId,
        userId: data.userId
      }
    })
    return result
  }
}

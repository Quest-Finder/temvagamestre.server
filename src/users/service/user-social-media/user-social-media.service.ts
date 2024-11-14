import { AppException } from '@/shared/exceptions/app-exception'
import { SocialMediaRepository } from '@/social-media/repository/social-media-repository'
import { type UserSocialMediaModel } from '@/users/repository/entity/user-social-media.model'
import { UserSocialMediaRepository } from '@/users/repository/user-social-media/user-social-media-repository'
import { UserRepository } from '@/users/repository/user/user-repository'
import { Injectable } from '@nestjs/common'

export type SaveUserSocialMediaInputService = {
  userId: string
  socialMediaId: string
  link: string
}

@Injectable()
export class UserSocialMediaService {
  constructor (
    private readonly socialMediaRepository: SocialMediaRepository,
    private readonly userRepository: UserRepository,
    private readonly userSocialMediaRepository: UserSocialMediaRepository
  ) { }

  async save ({ link, socialMediaId, userId }: SaveUserSocialMediaInputService): Promise<UserSocialMediaModel | undefined > {
    const socialMedia = await this.socialMediaRepository.findById(socialMediaId)
    if (!socialMedia) {
      throw new AppException('Social Media not found')
    }
    const user = await this.userRepository.findById(userId)
    if (!user) {
      throw new AppException('User not found')
    }
    return await this.userSocialMediaRepository.save({ link, socialMediaId, userId })
  }
}

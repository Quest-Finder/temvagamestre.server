import { type SocialMediaModel } from '@/domain/models/social-media/social-media-model'
import { type FindSocialMediaByIdRepo } from '@/usecases/contracts/db/social-media/find-social-media-by-id-repo'

export class FindSocialMediaByIdPrismaRepo implements FindSocialMediaByIdRepo {
  async execute (socialMediaId: string): Promise<null | SocialMediaModel> {
    return await Promise.resolve(null)
  }
}

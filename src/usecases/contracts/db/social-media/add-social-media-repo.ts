import { type SocialMediaModel } from '@/domain/models/social-media/social-media-model'

export interface AddSocialMediaRepo {
  execute: (data: SocialMediaModel) => Promise<void>
}

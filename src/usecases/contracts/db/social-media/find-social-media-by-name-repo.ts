import { type SocialMediaModel } from '@/domain/models/social-media/social-media-model'

export interface FindSocialMediaByNameRepo {
  execute: (name: string) => Promise<SocialMediaModel | null>
}

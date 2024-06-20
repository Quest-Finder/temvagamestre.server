import { type SocialMediaModel } from '@/models/social-media-model'

export interface FindSocialMediaByIdRepo {
  execute: (id: string) => Promise<null | SocialMediaModel>
}

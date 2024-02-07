import { type SocialMediaModel } from '@/domain/models/social-media/social-media-model'

export interface FindSocialMediaByIdRepo {
  execute: (id: string) => Promise<null | SocialMediaModel>
}

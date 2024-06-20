import { type SocialMediaModel } from '@/models/social-media-model'

export interface FindManySocialMediasRepo {
  execute: () => Promise<SocialMediaModel[]>
}

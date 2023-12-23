import { type SocialMediaModel } from '@/domain/models/social-media/social-media-model'

export interface FindManySocialMediasRepo {
  execute: () => Promise<SocialMediaModel[] | []>
}

import { type SocialMediaModel } from '@/models/social-media-model'

export interface FindManySocialMedias {
  perform: () => Promise<SocialMediaModel[]>
}

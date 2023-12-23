import { type SocialMediaModel } from '@/domain/models/social-media/social-media-model'

export interface FindManySocialMedias {
  perform: () => Promise<SocialMediaModel[] | []>
}

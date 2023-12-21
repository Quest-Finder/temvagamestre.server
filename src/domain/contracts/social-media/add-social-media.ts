import { type SocialMediaExistsError } from '@/domain/errors/social-media-exists-error'
import { type Either } from '@/shared/either'

export type AddSocialMediaData = {
  name: string
}

export type AddSocialMediaResponse = Either<SocialMediaExistsError, null>

export interface AddSocialMedia {
  perform: (data: AddSocialMediaData) => Promise<AddSocialMediaResponse>
}

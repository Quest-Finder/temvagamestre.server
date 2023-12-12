import { type Either } from '@/shared/either'
import { type InvalidSocialMediaId } from '../errors'

export interface UpdateUserSocialMediaData {
  externalAuthUserId: string
  socialMediaId: string
  link: string
}

export type UpdateUserSocialMediaResponse = Either<InvalidSocialMediaId, null>

export interface UpdateUserSocialMedia {
  perform: (data: UpdateUserSocialMediaData) => Promise<UpdateUserSocialMediaResponse>
}

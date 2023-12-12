import { type Either } from '@/shared/either'
import { type InvalidSocialMediaIdError } from '../../errors'

export interface UpdateUserSocialMediaData {
  externalAuthUserId: string
  socialMediaId: string
  link: string
}

export type UpdateUserSocialMediaResponse = Either<InvalidSocialMediaIdError, null>

export interface UpdateUserSocialMedia {
  perform: (data: UpdateUserSocialMediaData) => Promise<UpdateUserSocialMediaResponse>
}

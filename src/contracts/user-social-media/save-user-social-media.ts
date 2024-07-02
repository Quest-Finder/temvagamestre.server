import { type Either } from '@/shared/either'
import { type InvalidSocialMediaIdError } from '@/errors'

export interface SaveUserSocialMediaData {
  userId: string
  socialMediaId: string
  link: string
}

export type SaveUserSocialMediaResponse = Either<InvalidSocialMediaIdError, void>

export interface SaveUserSocialMedia {
  perform: (data: SaveUserSocialMediaData) => Promise<SaveUserSocialMediaResponse>
}

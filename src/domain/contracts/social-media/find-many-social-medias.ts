import { type SocialMediaModel } from '@/domain/models/social-media/social-media-model'
import { type Either } from '@/shared/either'

export type FindManySocialMediasResponse = Either<Error, SocialMediaModel[]>

export interface FindManySocialMedias {
  perform: () => Promise<FindManySocialMediasResponse>
}

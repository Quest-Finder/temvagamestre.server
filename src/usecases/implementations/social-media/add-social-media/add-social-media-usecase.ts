import { type AddSocialMedia, type AddSocialMediaData, type AddSocialMediaResponse } from '@/domain/contracts/social-media'
import { type SocialMedias } from '@/domain/contracts/social-media/social-medias'
import { type AddSocialMediaRepo } from '@/usecases/contracts/db/social-media'
import { type IdBuilder } from '@/usecases/contracts/id'

export class AddSocialMediaUseCase implements AddSocialMedia {
  constructor (
    private readonly socialMedias: SocialMedias,
    private readonly addSocialMediaRepo: AddSocialMediaRepo,
    private readonly idBuilder: IdBuilder
  ) {}

  async perform (data: AddSocialMediaData): Promise<AddSocialMediaResponse> {

  }
}

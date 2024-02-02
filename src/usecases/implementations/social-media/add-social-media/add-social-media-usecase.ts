import type { AddSocialMedia } from '@/domain/contracts/social-media'
import { SocialMedia } from '@/domain/entities/social-media/social-media'
import { type AddSocialMediaRepo } from '@/usecases/contracts/db/social-media'
import { type FindSocialMediaByNameRepo } from '@/usecases/contracts/db/social-media/find-social-media-by-name-repo'
import { type IdBuilder } from '@/usecases/contracts/id'

export class AddSocialMediaUseCase implements AddSocialMedia {
  constructor (
    private readonly addSocialMediaRepo: AddSocialMediaRepo,
    private readonly findSocialMediaByNameRepo: FindSocialMediaByNameRepo,
    private readonly idBuilder: IdBuilder
  ) {}

  async perform (): Promise<void> {
    const socialMedias = SocialMedia.getSocialMedias()
    for (const socialMedia of socialMedias) {
      const existingSocialMedia = await this.findSocialMediaByNameRepo.execute(socialMedia)
      if (!existingSocialMedia) {
        const id = this.idBuilder.build()
        await this.addSocialMediaRepo.execute({ id, name: socialMedia })
      }
    }
  }
}

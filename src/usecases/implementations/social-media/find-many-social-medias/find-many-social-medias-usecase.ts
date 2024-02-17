import type { FindManySocialMedias } from '@/domain/contracts/social-media/find-many-social-medias'
import { type SocialMediaModel } from '@/domain/models'
import { type FindManySocialMediasRepo } from '@/usecases/contracts/db/social-media'

export class FindManySocialMediasUsecase implements FindManySocialMedias {
  constructor (private readonly findManySocialMediasRepo: FindManySocialMediasRepo) {}

  async perform (): Promise<SocialMediaModel[]> {
    const socialMedias = await this.findManySocialMediasRepo.execute()
    return socialMedias
  }
}

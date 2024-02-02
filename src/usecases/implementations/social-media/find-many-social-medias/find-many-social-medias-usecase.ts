import type { FindManySocialMediasResponse, FindManySocialMedias } from '@/domain/contracts/social-media/find-many-social-medias'
import { right } from '@/shared/either'
import { type FindManySocialMediasRepo } from '@/usecases/contracts/db/social-media'

export class FindManySocialMediasUsecase implements FindManySocialMedias {
  constructor (private readonly findManySocialMediasRepo: FindManySocialMediasRepo) {}

  async perform (): Promise<FindManySocialMediasResponse> {
    const socialMedias = await this.findManySocialMediasRepo.execute()
    return right(socialMedias)
  }
}

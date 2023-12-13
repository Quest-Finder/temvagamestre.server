import { type UpdateUserSocialMediaData, type UpdateUserSocialMedia, type UpdateUserSocialMediaResponse } from '@/domain/contracts/user'
import { InvalidSocialMediaIdError } from '@/domain/errors'
import { left, right } from '@/shared/either'

import { type FindSocialMediaByIdRepo } from '@/usecases/contracts/db/social-media/find-social-media-by-id-repo'
import { type AddOrUpdateUserSocialMediaByIdsRepo } from '@/usecases/contracts/db/user/add-or-update-user-social-media-by-ids-repo'

export class UpdateUserSocialMediaUseCase implements UpdateUserSocialMedia {
  constructor (
    private readonly findSocialMediaByIdRepo: FindSocialMediaByIdRepo,
    private readonly addOrUpdateUserSocialMediaByIdsRepo: AddOrUpdateUserSocialMediaByIdsRepo
  ) {}

  async perform (data: UpdateUserSocialMediaData): Promise<UpdateUserSocialMediaResponse> {
    const socialMediaOrNull = await this.findSocialMediaByIdRepo.execute(data.socialMediaId)

    if (!socialMediaOrNull) {
      return left(new InvalidSocialMediaIdError(data.socialMediaId))
    }

    await this.addOrUpdateUserSocialMediaByIdsRepo.execute(data.userId, data.socialMediaId)

    return right(null)
  }
}

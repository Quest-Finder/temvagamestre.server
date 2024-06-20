import type { SaveUserSocialMediaResponse, SaveUserSocialMedia, SaveUserSocialMediaData } from '@/contracts/user-social-media'
import { InvalidSocialMediaIdError } from '@/errors'
import { left, right } from '@/shared/either'
import { type FindSocialMediaByIdRepo } from '@/usecases/contracts/db/social-media'
import { type SaveUserSocialMediaRepo } from '@/usecases/contracts/db/user-social-media'

export class SaveUserSocialMediaUseCase implements SaveUserSocialMedia {
  constructor (
    private readonly findSocialMediaByIdRepo: FindSocialMediaByIdRepo,
    private readonly saveUserSocialMediaRepo: SaveUserSocialMediaRepo
  ) {}

  async perform (data: SaveUserSocialMediaData): Promise<SaveUserSocialMediaResponse> {
    const socialMediaOrNull = await this.findSocialMediaByIdRepo.execute(data.socialMediaId)
    if (!socialMediaOrNull) {
      return left(new InvalidSocialMediaIdError(data.socialMediaId))
    }
    await this.saveUserSocialMediaRepo.execute(data)
    return right()
  }
}

import { UuidAdapter } from '@/infra/id/uuid-adapter/uuid-adapter'
import { ValueObject } from '@/shared/domain'
import { left, right, type Either } from '@/shared/either'
import { InvalidSocialMediaError } from '../../errors/invalid-social-media-error'

export type SocialMediaProps = { socialMediaId: string, userLink: string }

export class SocialMedia extends ValueObject<SocialMediaProps> {
  private constructor (
    props: SocialMediaProps
  ) {
    super(props)
    Object.freeze(this)
  }

  static create ({
    socialMediaId,
    userLink
  }: SocialMediaProps): Either<InvalidSocialMediaError, SocialMedia> {
    if (!SocialMedia.validate({ socialMediaId, userLink })) {
      return left(new InvalidSocialMediaError(socialMediaId))
    }
    return right(new SocialMedia({ socialMediaId, userLink }))
  }

  private static validate (
    {
      socialMediaId,
      userLink
    }: SocialMediaProps
  ): boolean {
    const uuid = new UuidAdapter()
    return uuid.validate(socialMediaId) && !!userLink
  }
}

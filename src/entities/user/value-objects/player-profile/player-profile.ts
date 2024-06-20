import { UuidAdapter } from '@/infra/uuid-adapter/uuid-adapter'
import { ValueObject } from '@/shared'
import { type Either, left, right } from '@/shared/either'
import { InvalidPlayerProfileIdError } from '../../errors/invalid-plyer-profile-id-error'

export class PlayerProfileId extends ValueObject {
  private constructor (playerProfileId: string) {
    super(playerProfileId)
    Object.freeze(this)
  }

  static create (playerProfileId: string): Either<InvalidPlayerProfileIdError, PlayerProfileId> {
    const playerProfileIdTrim = playerProfileId.trim()
    if (!PlayerProfileId.validate(playerProfileIdTrim)) {
      return left(new InvalidPlayerProfileIdError(playerProfileId))
    }
    return right(new PlayerProfileId(playerProfileIdTrim))
  }

  private static validate (playerProfileId: string): boolean {
    return new UuidAdapter().validate(playerProfileId)
  }
}

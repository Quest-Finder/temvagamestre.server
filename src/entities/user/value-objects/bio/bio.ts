import { ValueObject } from '@/shared'
import { type Either, left, right } from '@/shared/either'
import { InvalidBioError } from '../../errors'

export class Bio extends ValueObject {
  private constructor (bio: string) {
    super(bio)
    Object.freeze(this)
  }

  static create (bio: string): Either<InvalidBioError, Bio> {
    const bioTrim = bio.trim()
    if (!Bio.validate(bioTrim)) {
      return left(new InvalidBioError(bioTrim))
    }
    return right(new Bio(bioTrim))
  }

  private static validate (bio: string): boolean {
    return bio.length >= 3 && bio.length <= 500
  }
}

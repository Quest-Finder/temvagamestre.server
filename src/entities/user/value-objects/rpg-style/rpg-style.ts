import { UuidAdapter } from '@/infra/uuid-adapter/uuid-adapter'
import { ValueObject } from '@/shared'
import { type Either, left, right } from '@/shared/either'
import { InvalidRpgStyleError } from '../../errors'

export class RpgStyle extends ValueObject {
  private constructor (rpgStyle: string) {
    super(rpgStyle)
    Object.freeze(this)
  }

  static create (rpgStyle: string): Either<InvalidRpgStyleError, RpgStyle> {
    if (!RpgStyle.validate(rpgStyle)) {
      return left(new InvalidRpgStyleError(rpgStyle))
    }
    return right(new RpgStyle(rpgStyle))
  }

  private static validate (rpgStyle: string): boolean {
    return new UuidAdapter().validate(rpgStyle)
  }
}

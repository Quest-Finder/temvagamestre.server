import { ValueObject } from '@/shared'
import { type Either, left, right } from '@/shared/either'
import { InvalidTitleError } from '../../errors/invalid-title-error'

export class Title extends ValueObject {
  private constructor (title: string) {
    super(title)
    Object.freeze(this)
  }

  static create (title: string): Either<InvalidTitleError, Title> {
    const titleTrim = title.trim()
    if (!Title.validate(titleTrim)) {
      return left(new InvalidTitleError(titleTrim))
    }
    return right(new Title(title))
  }

  private static validate (title: string): boolean {
    return title.length >= 3 && title.length <= 100
  }
}

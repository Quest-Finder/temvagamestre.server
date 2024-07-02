import { type Either, left, right } from '@/shared/either'
import { InvalidNameError } from '../../errors'
import { ValueObject } from '@/shared'

export class Name extends ValueObject {
  private constructor (name: string) {
    super(name)
    Object.freeze(this)
  }

  static create (name: string): Either<InvalidNameError, Name> {
    if (!Name.validate(name)) {
      return left(new InvalidNameError(name))
    }
    name = name.trim()
    name = name.replace(/\s+/g, ' ')
    return right(new Name(name))
  }

  private static validate (name: string): boolean {
    if (name.length < 3 || name.length > 30) {
      return false
    }
    const regex = /^.*[!@#$%^&*(),.?":{}|<>0-9_].*$/
    if (regex.test(name)) {
      return false
    }
    return true
  }
}

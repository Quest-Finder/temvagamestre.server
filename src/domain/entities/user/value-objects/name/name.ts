import { type Either, left, right } from '@/shared/either'
import { InvalidNameError } from '../../errors'

export class Name {
  private constructor (private readonly name: string) {
    Object.freeze(this)
  }

  static create (name: string): Either<InvalidNameError, Name> {
    if (!Name.validade(name)) {
      return left(new InvalidNameError(name))
    }
    name = name.trim()
    name = name.replace(/\s+/g, ' ')
    return right(new Name(name))
  }

  private static validade (name: string): boolean {
    const regex = /^.*[!@#$%^&*(),.?":{}|<>0-9_].*$/
    if (regex.test(name)) {
      return false
    }
    return true
  }
}

import { type Either, left, right } from '@/shared/either'
import { InvalidUsernameError } from '../../errors'
import { ValueObject } from '@/shared/domain'

export class Username extends ValueObject {
  private constructor (username: string) {
    super(username)
    Object.freeze(this)
  }

  static create (username: string): Either<InvalidUsernameError, Username> {
    if (!Username.validate(username)) {
      return left(new InvalidUsernameError(username))
    }
    username = username.trim()
    username = username.replace(/\s+/g, ' ')
    return right(new Username(username))
  }

  private static validate (username: string): boolean {
    if (username.length < 1 || username.length > 15) {
      return false
    }
    const regex = /^[a-zA-Z0-9-']*$/
    if (!regex.test(username)) {
      return false
    }
    return true
  }
}

import { ValueObject } from '@/shared'
import { left, right, type Either } from '@/shared/either'
import { InvalidPasswordError } from '../../errors/invalid-password-error'

export class Password extends ValueObject {
  private constructor (password: string) {
    super(password)
    Object.freeze(this)
  }

  static create (password: string): Either<InvalidPasswordError, Password> {
    if (!Password.validate(password)) {
      return left(new InvalidPasswordError())
    }
    return right(new Password(password))
  }

  private static validate (password: string): boolean {
    if (password.length < 6 || password.length > 30) {
      return false
    }
    // It is necessary to validate if this regex matches the requirements of the project
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,30}$/
    if (!regex.test(password)) {
      return false
    }
    return true
  }
}

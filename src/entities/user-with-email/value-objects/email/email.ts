import { ValueObject } from '@/shared'
import { type Either, left, right } from '@/shared/either'

export class Email extends ValueObject {
  private constructor (email: string) {
    super(email)
    Object.freeze(this)
  }

  static create (email: string): Either <InvalidEmailError, Email> {
    if (!Email.validate(email)) {
      return left(new InvalidEmailError(email))
    }

    email = email.trim()
    email = email.toLowerCase()
    email = email.replace(/\s+/g, '')
    return right(new Email(email))
  }

  private static validate (email: string): boolean {
    if (email.length < 5 || email.length > 30) {
      return false
    }
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if (!regex.test(email)) {
      return false
    }
    return true
  }
}

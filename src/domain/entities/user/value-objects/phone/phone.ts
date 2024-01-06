import { left, right, type Either } from '@/shared/either'
import { InvalidPhoneError } from '../../errors'

export class Phone {
  private constructor (private readonly phone: string) {
    Object.freeze(this)
  }

  static create (phone: string): Either<InvalidPhoneError, Phone> {
    if (!Phone.validade(phone)) {
      return left(new InvalidPhoneError(phone))
    }
    phone = phone.replace(/\s+/g, '')
    return right(new Phone(phone))
  }

  private static validade (phone: string): boolean {
    phone = phone.replace(/\s+/g, '')
    const regex = /[a-zA-Z]|[^a-zA-Z0-9]/
    if (regex.test(phone)) {
      return false
    }
    return true
  }
}

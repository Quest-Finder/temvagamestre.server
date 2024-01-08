import { InvalidLastNameError } from '@/domain/entities/user/errors'
import { left, right, type Either } from '@/shared/either'
import { Name } from '../name'

export class LastName {
  private constructor (private readonly lastName: string) {
    Object.freeze(this)
  }

  static create (lastName: string): Either<InvalidLastNameError, LastName> {
    const result = Name.create(lastName)
    if (result.isLeft()) {
      return left(new InvalidLastNameError(lastName))
    }
    return right(new LastName(result.value.name))
  }
}

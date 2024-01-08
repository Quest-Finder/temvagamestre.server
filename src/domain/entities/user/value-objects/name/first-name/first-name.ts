import { InvalidFirstNameError } from '@/domain/entities/user/errors'
import { left, right, type Either } from '@/shared/either'
import { Name } from '../name'

export class FirstName {
  private constructor (private readonly firstName: string) {
    Object.freeze(this)
  }

  static create (firstName: string): Either<InvalidFirstNameError, FirstName> {
    const result = Name.create(firstName)
    if (result.isLeft()) {
      return left(new InvalidFirstNameError(firstName))
    }
    return right(new FirstName(result.value.name))
  }
}

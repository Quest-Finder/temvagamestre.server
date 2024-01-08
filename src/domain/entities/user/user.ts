import { left, type Either } from '@/shared/either'
import type { InvalidDateOfBirthError, InvalidFirstNameError, InvalidLastNameError, InvalidPhoneError } from './errors'
import { DateOfBirth, FirstName, LastName, Phone } from './value-objects'

export type UpdateUserEntityData = {
  firstName?: string
  lastName?: string
  phone?: string
  dateOfBirth?: string
}

type UserErrors = InvalidDateOfBirthError | InvalidFirstNameError | InvalidLastNameError | InvalidPhoneError

export type UserResponse = Either<UserErrors, User>

export class User {
  private constructor (
    private readonly firstName: FirstName,
    private readonly lastName: LastName,
    private readonly phone: Phone,
    private readonly dateOfBirth: DateOfBirth
  ) {
    Object.freeze(this)
  }

  static update (data: UpdateUserEntityData): UserResponse {
    const results: Array<Either<UserErrors, FirstName | LastName | Phone | DateOfBirth>> = []
    if (data.firstName) results.push(FirstName.create(data.firstName))
    if (data.lastName) results.push(LastName.create(data.lastName))
    if (data.phone) results.push(Phone.create(data.phone))
    if (data.dateOfBirth) results.push(DateOfBirth.create(data.dateOfBirth))
    for (const result of results) {
      if (result.isLeft()) return left(result.value)
    }
    return left(new Error())
  }
}

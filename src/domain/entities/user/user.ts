import { left, type Either, right } from '@/shared/either'
import type { InvalidDateOfBirthError, InvalidFirstNameError, InvalidLastNameError, InvalidPhoneError } from './errors'
import { DateOfBirth, FirstName, LastName, Phone } from './value-objects'

export type UpdateUserEntityData = {
  firstName?: string
  lastName?: string
  phone?: string
  dateOfBirth?: string
}

type UserErrors = InvalidDateOfBirthError | InvalidFirstNameError | InvalidLastNameError | InvalidPhoneError

type UpdateUserValueObjects = {
  firstName?: FirstName
  lastName?: LastName
  phone?: Phone
  dateOfBirth?: DateOfBirth
}

export type UpdateUserResponse = Either<UserErrors, UpdateUserValueObjects>

type ValueObjectsResults = {
  firstName?: Either<InvalidFirstNameError, FirstName>
  lastName?: Either<InvalidLastNameError, LastName>
  phone?: Either<InvalidPhoneError, Phone>
  dateOfBirth?: Either<InvalidDateOfBirthError, DateOfBirth>
}

export class User {
  static update (data: UpdateUserEntityData): UpdateUserResponse {
    const results: ValueObjectsResults = {
      ...(data.firstName && { firstName: FirstName.create(data.firstName) }),
      ...(data.lastName && { lastName: LastName.create(data.lastName) }),
      ...(data.phone && { phone: Phone.create(data.phone) }),
      ...(data.dateOfBirth && { dateOfBirth: DateOfBirth.create(data.dateOfBirth) })
    }
    for (const result of Object.values(results)) {
      if (result.isLeft()) return left(result.value)
    }
    return right({
      ...(results.firstName && { firstName: results.firstName.value as FirstName }),
      ...(results.lastName && { lastName: results.lastName.value as LastName }),
      ...(results.phone && { phone: results.phone.value as Phone }),
      ...(results.dateOfBirth && { dateOfBirth: results.dateOfBirth.value as DateOfBirth })
    })
  }
}

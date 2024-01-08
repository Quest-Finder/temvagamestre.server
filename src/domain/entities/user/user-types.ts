import { type Either } from '@/shared/either'
import type { InvalidDateOfBirthError, InvalidFirstNameError, InvalidLastNameError, InvalidPhoneError } from './errors'
import type { DateOfBirth, FirstName, LastName, Phone } from './value-objects'

export type UpdateUserEntityData = {
  firstName?: string
  lastName?: string
  phone?: string
  dateOfBirth?: string
}

type UserEntityErrors = InvalidDateOfBirthError | InvalidFirstNameError | InvalidLastNameError | InvalidPhoneError

type UpdateUserEntityValueObjects = {
  firstName?: FirstName
  lastName?: LastName
  phone?: Phone
  dateOfBirth?: DateOfBirth
}

export type UpdateUserEntityResponse = Either<UserEntityErrors, UpdateUserEntityValueObjects>

export type UpdateUserEntityValueObjectsResults = {
  firstName?: Either<InvalidFirstNameError, FirstName>
  lastName?: Either<InvalidLastNameError, LastName>
  phone?: Either<InvalidPhoneError, Phone>
  dateOfBirth?: Either<InvalidDateOfBirthError, DateOfBirth>
}

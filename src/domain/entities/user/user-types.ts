import { type Either } from '@/shared/either'
import type { InvalidDateOfBirthError, InvalidFirstNameError, InvalidLastNameError, InvalidPhoneError } from './errors'
import type { DateOfBirth, FirstName, LastName, Phone } from './value-objects'

export type UpdateUserEntityData = {
  firstName?: string
  lastName?: string
  phone?: string
  dateOfBirth?: string
}

export type UserEntityErrors = InvalidDateOfBirthError | InvalidFirstNameError | InvalidLastNameError | InvalidPhoneError

type UpdateUserValueResponse = UpdateUserEntityData

export type UpdateUserEntityResponse = Either<UserEntityErrors, UpdateUserValueResponse>

export type UpdateUserEntityValueObjectsResults = {
  firstName?: Either<InvalidFirstNameError, FirstName>
  lastName?: Either<InvalidLastNameError, LastName>
  phone?: Either<InvalidPhoneError, Phone>
  dateOfBirth?: Either<InvalidDateOfBirthError, DateOfBirth>
}

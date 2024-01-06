import { left, type Either } from '@/shared/either'
import type { InvalidDateOfBirthError, InvalidNameError, InvalidPhoneError } from './errors'
import { Name, DateOfBirth, Phone } from './value-objects'

export type UpdateUserEntityData = {
  firstName?: string
  lastName?: string
  phone?: string
  dateOfBirth?: string
}

type UserErrors = InvalidDateOfBirthError | InvalidNameError | InvalidPhoneError

export type UserResponse = Either<UserErrors, User>

export class User {
  private constructor (
    private readonly firstName: Name,
    private readonly lastName: Name,
    private readonly phone: Phone,
    private readonly dateOfBirth: DateOfBirth
  ) {
    Object.freeze(this)
  }

  static update (data: UpdateUserEntityData): UserResponse {
    const results: Array<Either<UserErrors, Name | Phone | DateOfBirth>> = []
    if (data.firstName) results.push(Name.create(data.firstName))
    if (data.lastName) results.push(Name.create(data.lastName))
    if (data.phone) results.push(Phone.create(data.phone))
    if (data.dateOfBirth) results.push(DateOfBirth.create(data.dateOfBirth))
    for (const result of results) {
      if (result.isLeft()) return left(result.value)
    }
    return left(new Error())
  }
}

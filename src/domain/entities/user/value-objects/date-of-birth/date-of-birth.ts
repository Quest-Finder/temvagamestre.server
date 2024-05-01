import { ValueObject } from '@/shared/domain'
import { left, right, type Either } from '@/shared/either'
import { formatDateStringToDateTime } from '@/util'
import { InvalidDateOfBirthError } from '../../errors'

export class DateOfBirth extends ValueObject<Date> {
  private constructor (dateOfBirth: Date) {
    super(dateOfBirth)
    Object.freeze(this)
  }

  static create (dateOfBirth: string): Either<InvalidDateOfBirthError, DateOfBirth> {
    if (!DateOfBirth.validate(dateOfBirth)) {
      return left(new InvalidDateOfBirthError(dateOfBirth))
    }
    dateOfBirth = dateOfBirth.replace(/\s+/g, '')
    const date = formatDateStringToDateTime(dateOfBirth)
    return right(new DateOfBirth(date))
  }

  private static validate (dateOfBirth: string): boolean {
    dateOfBirth = dateOfBirth.replace(/\s+/g, '')
    const regex = /^(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])-(\d{4})$/
    if (!regex.test(dateOfBirth)) {
      return false
    }
    const [monthString, dayString, yearString] = dateOfBirth.split('-')
    const year = Number(yearString)
    const month = Number(monthString)
    const day = Number(dayString)
    if (month === 2 && day > 29) {
      return false
    }
    if ((!((year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0))) && month === 2 && day === 29) {
      return false
    }
    return true
  }
}

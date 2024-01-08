import { left, right, type Either } from '@/shared/either'
import { InvalidDateOfBirthError } from '../../errors'

export class DateOfBirth {
  private constructor (readonly dateOfBirth: string) {
    Object.freeze(this)
  }

  static create (dateOfBirth: string): Either<InvalidDateOfBirthError, DateOfBirth> {
    if (!DateOfBirth.validade(dateOfBirth)) {
      return left(new InvalidDateOfBirthError(dateOfBirth))
    }
    dateOfBirth = dateOfBirth.replace(/\s+/g, '')
    return right(new DateOfBirth(dateOfBirth))
  }

  private static validade (dateOfBirth: string): boolean {
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

import { ValueObject } from '@/shared/domain'
import { left, right, type Either } from '@/shared/either'
import { formatDateStringToDateTime } from '@/util'
import { InvalidDateOfBirthError, InvalidDateOfBirthleesThan18Error } from '../../errors'

type CleanDateBirth = {
  year: number
  month: number
  day: number
  formatedDate: string
}

export class DateOfBirth extends ValueObject<Date> {
  private constructor (dateOfBirth: Date) {
    super(dateOfBirth)
    Object.freeze(this)
  }

  static create (dateOfBirth: string): Either<InvalidDateOfBirthError | InvalidDateOfBirthleesThan18Error, DateOfBirth> {
    if (!DateOfBirth.validateFormat(dateOfBirth)) {
      return left(new InvalidDateOfBirthError(dateOfBirth))
    }
    if (!DateOfBirth.validateGreater18(dateOfBirth)) {
      return left(new InvalidDateOfBirthleesThan18Error(dateOfBirth))
    }
    dateOfBirth = dateOfBirth.replace(/\s+/g, '')
    const date = formatDateStringToDateTime(dateOfBirth)
    return right(new DateOfBirth(date))
  }

  private static validateFormat (dateOfBirth: string): boolean {
    const { formatedDate, month, day, year } = this.cleanDateOfBirth(dateOfBirth)
    const regex = /^(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])-(\d{4})$/
    if (!regex.test(formatedDate)) {
      return false
    }
    if (month === 2 && day > 29) {
      return false
    }
    if ((!((year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0))) && month === 2 && day === 29) {
      return false
    }
    return true
  }

  private static validateGreater18 (dateOfBirth: string): boolean {
    const { year, month, day } = this.cleanDateOfBirth(dateOfBirth)
    const currentDate = Date.now()
    const eighteenYearsInMillis = 18 * 365 * 24 * 60 * 60 * 1000
    const date = new Date(year, month - 1, day).getTime()
    if (date > currentDate - eighteenYearsInMillis) {
      return false
    }
    return true
  }

  private static readonly cleanDateOfBirth = (dateOfBirth: string): CleanDateBirth => {
    dateOfBirth = dateOfBirth.replace(/\s+/g, '')
    const [monthString, dayString, yearString] = dateOfBirth.split('-')
    const year = Number(yearString)
    const month = Number(monthString)
    const day = Number(dayString)
    return { year, month, day, formatedDate: `${monthString}-${dayString}-${yearString}` }
  }
}

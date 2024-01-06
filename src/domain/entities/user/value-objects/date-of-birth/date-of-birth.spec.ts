import { InvalidDateOfBirthError } from '../../errors'
import { DateOfBirth } from './date-of-birth'

describe('DateOfBirth ValueObject', () => {
  it('Should remove all spaces between words if have any', () => {
    const sut = DateOfBirth.create(' 12- 31-2000 ')
    expect(sut.value).toEqual({ dateOfBirth: '12-31-2000' })
  })

  it('Should return InvalidDateOfBirthError if dateOfBirth is invalid format', () => {
    const sut = DateOfBirth.create(' 12/31/2000 ')
    expect(sut.value).toEqual(new InvalidDateOfBirthError(' 12/31/2000 '))
  })

  it('Should return InvalidDateOfBirthError if dateOfBirth is invalid format (2)', () => {
    const sut = DateOfBirth.create('12312000')
    expect(sut.value).toEqual(new InvalidDateOfBirthError('12312000'))
  })

  it('Should return InvalidDateOfBirthError if dateOfBirth is invalid format (3)', () => {
    const sut = DateOfBirth.create('122000')
    expect(sut.value).toEqual(new InvalidDateOfBirthError('122000'))
  })

  it('Should return InvalidDateOfBirthError if dateOfBirth is invalid format (4)', () => {
    const sut = DateOfBirth.create('13-10-2000')
    expect(sut.value).toEqual(new InvalidDateOfBirthError('13-10-2000'))
  })

  it('Should return InvalidDateOfBirthError if February has 29 days in a non-leap year', () => {
    const sut = DateOfBirth.create('02-29-2001')
    expect(sut.value).toEqual(new InvalidDateOfBirthError('02-29-2001'))
  })

  it('Should return an DateOfBirth if February has 29 days in a leap year', () => {
    const sut = DateOfBirth.create('02-29-2000')
    expect(sut.value).toEqual({ dateOfBirth: '02-29-2000' })
  })

  it('Should return an DateOfBirth on success', () => {
    const sut = DateOfBirth.create('12-31-2000')
    expect(sut.value).toEqual({ dateOfBirth: '12-31-2000' })
  })
})

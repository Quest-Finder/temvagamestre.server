import { InvalidDateOfBirthError, InvalidDateOfBirthleesThan18Error } from '../../errors'
import { DateOfBirth } from './date-of-birth'

describe('DateOfBirth ValueObject', () => {
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

  it('Should return InvalidDateOfBirthError if dateOfBirth if February contains more than 29 days', () => {
    const sut = DateOfBirth.create('02-30-2000')
    expect(sut.value).toEqual(new InvalidDateOfBirthError('02-30-2000'))
  })

  it('Should return InvalidDateOfBirthError if February has 29 days in a non-leap year', () => {
    const sut = DateOfBirth.create('02-29-2001')
    expect(sut.value).toEqual(new InvalidDateOfBirthError('02-29-2001'))
  })

  it('Should return InvalidDateOfBirthError if dateOfBirth is less than 18', () => {
    const sut = DateOfBirth.create(' 12-31-2020 ')
    expect(sut.value).toEqual(new InvalidDateOfBirthleesThan18Error(' 12-31-2020 '))
  })

  it('Should remove all spaces between words if have any', () => {
    const sut = DateOfBirth.create(' 12- 31-2000 ')
    expect(sut.value).toEqual({ props: new Date('2000-12-31T00:00:00.000Z') })
  })

  it('Should return an DateOfBirth if February has 29 days in a leap year', () => {
    const sut = DateOfBirth.create('02-29-2000')
    expect(sut.value).toEqual({ props: new Date('2000-02-29T00:00:00.000Z') })
  })

  it('Should return an DateOfBirth on success', () => {
    const sut = DateOfBirth.create('12-31-2000')
    expect(sut.value).toEqual({ props: new Date('2000-12-31T00:00:00.000Z') })
  })
})

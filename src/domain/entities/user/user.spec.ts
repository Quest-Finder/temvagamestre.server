import { left, right } from '@/shared/either'
import { InvalidDateOfBirthError, InvalidFirstNameError, InvalidLastNameError, InvalidPhoneError } from './errors'
import { User } from './user'
import { DateOfBirth, FirstName, LastName, Phone } from './value-objects'
import { type UpdateUserEntityData } from './user-types'

jest.mock('@/domain/entities/user/value-objects/name/first-name/first-name', () => ({
  FirstName: {
    create: jest.fn(() => { return right({ firstName: 'any_first_name' }) })
  }
}))

jest.mock('@/domain/entities/user/value-objects/name/last-name/last-name', () => ({
  LastName: {
    create: jest.fn(() => { return right({ lastName: 'any_last_name' }) })
  }
}))

jest.mock('@/domain/entities/user/value-objects/phone/phone', () => ({
  Phone: {
    create: jest.fn(() => { return right({ phone: 'any_phone' }) })
  }
}))

jest.mock('@/domain/entities/user/value-objects/date-of-birth/date-of-birth', () => ({
  DateOfBirth: {
    create: jest.fn(() => { return right({ dateOfBirth: 'any_date' }) })
  }
}))

const makeFakeUpdateUserEntityData = (): UpdateUserEntityData => ({
  firstName: 'any_first_name',
  lastName: 'any_last_name',
  phone: 'any_phone',
  dateOfBirth: 'any_date'
})

describe('User Entity', () => {
  it('Should call FirstName with correct value firstName', () => {
    const createSpy = jest.spyOn(FirstName, 'create')
    User.update(makeFakeUpdateUserEntityData())
    expect(createSpy).toHaveBeenCalledWith('any_first_name')
  })

  it('Should return InvalidFirstNameError if FirstName return InvalidFirstNameError', () => {
    jest.spyOn(FirstName, 'create').mockReturnValueOnce(
      left(new InvalidFirstNameError('any_first_name'))
    )
    const sut = User.update(makeFakeUpdateUserEntityData())
    expect(sut.value).toEqual(new InvalidFirstNameError('any_first_name'))
  })

  it('Should call LastName with correct value lastName', () => {
    const createSpy = jest.spyOn(LastName, 'create')
    User.update(makeFakeUpdateUserEntityData())
    expect(createSpy).toHaveBeenCalledWith('any_last_name')
  })

  it('Should return InvalidLastNameError if LastName return InvalidLastNameError', () => {
    jest.spyOn(LastName, 'create').mockReturnValueOnce(
      left(new InvalidLastNameError('any_last_name'))
    )
    const sut = User.update(makeFakeUpdateUserEntityData())
    expect(sut.value).toEqual(new InvalidLastNameError('any_last_name'))
  })

  it('Should call Phone with correct value phone', () => {
    const createSpy = jest.spyOn(Phone, 'create')
    User.update(makeFakeUpdateUserEntityData())
    expect(createSpy).toHaveBeenCalledWith('any_phone')
  })

  it('Should return InvalidPhoneError if Phone return InvalidPhoneError', () => {
    jest.spyOn(Phone, 'create').mockReturnValueOnce(
      left(new InvalidPhoneError('any_phone'))
    )
    const sut = User.update(makeFakeUpdateUserEntityData())
    expect(sut.value).toEqual(new InvalidPhoneError('any_phone'))
  })

  it('Should call DateOfBirth with correct value dateOfBirth', () => {
    const createSpy = jest.spyOn(DateOfBirth, 'create')
    User.update(makeFakeUpdateUserEntityData())
    expect(createSpy).toHaveBeenCalledWith('any_date')
  })

  it('Should return InvalidDateOfBirthError if DateOfBirth return InvalidDateOfBirthError', () => {
    jest.spyOn(Phone, 'create').mockReturnValueOnce(
      left(new InvalidDateOfBirthError('any_date'))
    )
    const sut = User.update(makeFakeUpdateUserEntityData())
    expect(sut.value).toEqual(new InvalidDateOfBirthError('any_date'))
  })

  it('Should return valid result on success', () => {
    const sut = User.update(makeFakeUpdateUserEntityData())
    expect(sut.value).toEqual({
      firstName: { firstName: 'any_first_name' },
      lastName: { lastName: 'any_last_name' },
      phone: { phone: 'any_phone' },
      dateOfBirth: { dateOfBirth: 'any_date' }
    })
  })
})

import { left, right } from '@/shared/either'
import { type UpdateUserEntityData, User } from './user'
import { DateOfBirth, Name, Phone } from './value-objects'
import { InvalidDateOfBirthError, InvalidNameError, InvalidPhoneError } from './errors'

jest.mock('@/domain/entities/user/value-objects/name/name', () => ({
  Name: {
    create: jest.fn(() => { return right({ name: 'any_name' }) })
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
  it('Should call Name with correct value firstName', () => {
    const createSpy = jest.spyOn(Name, 'create')
    User.update(makeFakeUpdateUserEntityData())
    expect(createSpy).toHaveBeenCalledWith('any_first_name', 'firstName')
  })

  it('Should call Name with correct value lastName', () => {
    const createSpy = jest.spyOn(Name, 'create')
    User.update(makeFakeUpdateUserEntityData())
    expect(createSpy).toHaveBeenCalledWith('any_last_name', 'lastName')
  })

  it('Should return InvalidNameError if Name return InvalidNameError', () => {
    jest.spyOn(Name, 'create').mockReturnValueOnce(
      left(new InvalidNameError('any_name'))
    )
    const sut = User.update(makeFakeUpdateUserEntityData())
    expect(sut.value).toEqual(new InvalidNameError('any_name'))
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
})

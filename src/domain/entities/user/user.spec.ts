import { left } from '@/shared/either'
import { InvalidDateOfBirthError, InvalidFirstNameError, InvalidLastNameError, InvalidPhoneError } from './errors'
import { User } from './user'
import { type UpdateUserEntityData } from './user-types'
import { DateOfBirth, FirstName, LastName, Phone } from './value-objects'

const makeFakeUpdateUserEntityData = (): UpdateUserEntityData => ({
  firstName: 'John',
  lastName: 'Doe',
  phone: '11999495599',
  dateOfBirth: '12-01-2000'
})

describe('User Entity', () => {
  it('Should call FirstName with correct value firstName', () => {
    const createSpy = jest.spyOn(FirstName, 'create')
    User.update(makeFakeUpdateUserEntityData())
    expect(createSpy).toHaveBeenCalledWith('John')
  })

  it('Should return InvalidFirstNameError if FirstName return InvalidFirstNameError', () => {
    jest.spyOn(FirstName, 'create').mockReturnValueOnce(
      left(new InvalidFirstNameError('John'))
    )
    const sut = User.update(makeFakeUpdateUserEntityData())
    expect(sut.value).toEqual(new InvalidFirstNameError('John'))
  })

  it('Should call LastName with correct value lastName', () => {
    const createSpy = jest.spyOn(LastName, 'create')
    User.update(makeFakeUpdateUserEntityData())
    expect(createSpy).toHaveBeenCalledWith('Doe')
  })

  it('Should return InvalidLastNameError if LastName return InvalidLastNameError', () => {
    jest.spyOn(LastName, 'create').mockReturnValueOnce(
      left(new InvalidLastNameError('Doe'))
    )
    const sut = User.update(makeFakeUpdateUserEntityData())
    expect(sut.value).toEqual(new InvalidLastNameError('Doe'))
  })

  it('Should call Phone with correct value phone', () => {
    const createSpy = jest.spyOn(Phone, 'create')
    User.update(makeFakeUpdateUserEntityData())
    expect(createSpy).toHaveBeenCalledWith('11999495599')
  })

  it('Should return InvalidPhoneError if Phone return InvalidPhoneError', () => {
    jest.spyOn(Phone, 'create').mockReturnValueOnce(
      left(new InvalidPhoneError('11999495599'))
    )
    const sut = User.update(makeFakeUpdateUserEntityData())
    expect(sut.value).toEqual(new InvalidPhoneError('11999495599'))
  })

  it('Should call DateOfBirth with correct value dateOfBirth', () => {
    const createSpy = jest.spyOn(DateOfBirth, 'create')
    User.update(makeFakeUpdateUserEntityData())
    expect(createSpy).toHaveBeenCalledWith('12-01-2000')
  })

  it('Should return InvalidDateOfBirthError if DateOfBirth return InvalidDateOfBirthError', () => {
    jest.spyOn(Phone, 'create').mockReturnValueOnce(
      left(new InvalidDateOfBirthError('12-01-2000'))
    )
    const sut = User.update(makeFakeUpdateUserEntityData())
    expect(sut.value).toEqual(new InvalidDateOfBirthError('12-01-2000'))
  })

  it('Should return valid result on success', () => {
    const sut = User.update(makeFakeUpdateUserEntityData())
    expect(sut.value).toEqual({
      firstName: 'John',
      lastName: 'Doe',
      phone: '11999495599',
      dateOfBirth: '12-01-2000'
    })
  })

  it('Should return valid result on success (2)', () => {
    const { firstName, ...data } = makeFakeUpdateUserEntityData()
    const sut = User.update(data)
    expect(sut.value).toEqual({
      lastName: 'Doe',
      phone: '11999495599',
      dateOfBirth: '12-01-2000'
    })
  })
})

import { left, right } from '@/shared/either'
import { LastName } from './last-name'
import { Name } from '../name'
import { InvalidLastNameError } from '../../../errors'

jest.mock('@/domain/entities/user/value-objects/name/name', () => ({
  Name: {
    create: jest.fn(() => { return right({ name: 'any_last_name' }) })
  }
}))

describe('LastName ValueObject', () => {
  it('Should call Name with correct first name', () => {
    const createSpy = jest.spyOn(Name, 'create')
    LastName.create('any_last_name')
    expect(createSpy).toHaveBeenCalledWith('any_last_name')
  })

  it('Should return InvalidLastNameError if Name returns an Error', () => {
    jest.spyOn(Name, 'create').mockImplementationOnce(() => (
      left(new Error('any_error'))
    ))
    const result = LastName.create('any_last_name')
    expect(result.value).toEqual(new InvalidLastNameError('any_last_name'))
  })

  it('Should return an LastName on success', async () => {
    const result = LastName.create('any_last_name')
    expect(result.value).toEqual({ lastName: 'any_last_name' })
  })
})

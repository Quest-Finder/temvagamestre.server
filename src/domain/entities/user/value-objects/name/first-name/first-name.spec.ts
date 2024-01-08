import { left, right } from '@/shared/either'
import { FirstName } from './first-name'
import { Name } from '../name'
import { InvalidFirstNameError } from '../../../errors'

jest.mock('@/domain/entities/user/value-objects/name/name', () => ({
  Name: {
    create: jest.fn(() => { return right({ name: 'any_first_name' }) })
  }
}))

describe('FirstName ValueObject', () => {
  it('Should call Name with correct first name', () => {
    const createSpy = jest.spyOn(Name, 'create')
    FirstName.create('any_first_name')
    expect(createSpy).toHaveBeenCalledWith('any_first_name')
  })

  it('Should return InvalidFirstNameError if Name returns an Error', () => {
    jest.spyOn(Name, 'create').mockImplementationOnce(() => (
      left(new Error('any_error'))
    ))
    const result = FirstName.create('any_first_name')
    expect(result.value).toEqual(new InvalidFirstNameError('any_first_name'))
  })

  it('Should return an FirstName on success', async () => {
    const result = FirstName.create('any_first_name')
    expect(result.value).toEqual({ firstName: 'any_first_name' })
  })
})

import { SomeFieldBeMandatoryError } from '@/validators/errors'
import { UpdateUserZodValidation } from './update-user-zod-validation'

describe('UpdateUserZodValidation', () => {
  it('Should return SomeFieldBeMandatoryError if not field is provided', () => {
    const sut = new UpdateUserZodValidation()
    const result = sut.validate({})
    expect(result.value).toEqual(
      new SomeFieldBeMandatoryError('firstName, lastName, nickname, phone, dateOfBirth')
    )
  })

  it('Should return right result if any field is provided', () => {
    const sut = new UpdateUserZodValidation()
    const result = sut.validate({ firstName: 'any_name' })
    expect(result.isRight()).toBe(true)
  })
})

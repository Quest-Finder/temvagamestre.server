import { SomeFieldBeMandatoryError } from '@/errors'
import { UpdateUserPreferenceZodValidation } from './update-user-preference-zod-validation'

describe('UpdateUserPreferenceZodValidation', () => {
  it('Should return SomeFieldBeMandatory if not field is provided', () => {
    const sut = new UpdateUserPreferenceZodValidation()
    const result = sut.validate({})
    expect(result.value).toEqual(new SomeFieldBeMandatoryError('activeType, frequency'))
  })

  it('Should return right result if any field is provided', () => {
    const sut = new UpdateUserPreferenceZodValidation()
    const result = sut.validate({ activeType: 'player' })
    expect(result.isRight()).toBe(true)
  })
})

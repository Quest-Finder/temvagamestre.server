import { SomeFieldBeMandatoryError } from '@/validators/errors'
import { UpdateUserPreferenceZodValidation } from './update-user-preference-zod-validation'

describe('UpdateUserPreferenceZodValidation', () => {
  it('Should return SomeFieldBeMandatory if not field is provided', async () => {
    const sut = new UpdateUserPreferenceZodValidation()
    const result = await sut.validate({})
    expect(result.value).toEqual(new SomeFieldBeMandatoryError('activeType, frequency'))
  })
})

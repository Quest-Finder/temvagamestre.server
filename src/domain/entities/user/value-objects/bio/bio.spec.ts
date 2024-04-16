import { InvalidBioError } from '../../errors'
import { Bio } from './bio'

describe('Username ValueObject', () => {
  it('Should return InvalidUsernameError if bio is less than 3 character', () => {
    const result = Bio.create('')
    expect(result.value).toEqual(new InvalidBioError(''))
  })

  it('Should return InvalidUsernameError if bio is more than 500 character', () => {
    const title = 'a'.repeat(501)
    const result = Bio.create(title)
    expect(result.value).toEqual(new InvalidBioError(title))
  })

  it('Should an Bio on success', () => {
    const result = Bio.create('any_title')
    expect(result.value).toEqual({ props: 'any_title' })
  })
})

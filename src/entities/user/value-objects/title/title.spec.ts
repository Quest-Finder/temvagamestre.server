import { InvalidTitleError } from '../../errors'
import { Title } from './title'

describe('Username ValueObject', () => {
  it('Should return InvalidUsernameError if title is less than 3 character', () => {
    const result = Title.create('')
    expect(result.value).toEqual(new InvalidTitleError(''))
  })

  it('Should return InvalidUsernameError if title is more than 100 character', () => {
    const title = 'a'.repeat(101)
    const result = Title.create(title)
    expect(result.value).toEqual(new InvalidTitleError(title))
  })

  it('Should an Title on success', () => {
    const result = Title.create('any_title')
    expect(result.value).toEqual({ props: 'any_title' })
  })
})

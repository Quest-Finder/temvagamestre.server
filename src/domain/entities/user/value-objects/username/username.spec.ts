import { InvalidUsernameError } from '../../errors'
import { Username } from './username'

describe('Username ValueObject', () => {
  it('Should return InvalidUsernameError if username is less than 1 character', () => {
    const result = Username.create('')
    expect(result.value).toEqual(new InvalidUsernameError(''))
  })

  it('Should return InvalidUsernameError if username is more than 15 character', () => {
    const name = 'a'.repeat(16)
    const result = Username.create(name)
    expect(result.value).toEqual(new InvalidUsernameError(name))
  })

  it('Should return InvalidUserNameError if user name contains any special character', async () => {
    const specialCharacters = [
      '!', '@', '#', '$', '%', '^', '&', '*',
      '(', ')', '_', '+', '`', '~', '{', '}',
      '[', ']', '|', ':', ';', '<', '>', '?',
      '/', '.', ',', '"', '\\', '='
    ]
    for (const sc of specialCharacters) {
      const result = Username.create('user' + sc + 'name')
      expect(result.value).toEqual(new InvalidUsernameError('user' + sc + 'name'))
    }
  })

  it('Should return an Username if username contains hyphen', () => {
    const result = Username.create('user-name')
    expect(result.value).toEqual({ props: 'user-name' })
  })

  it('Should return an Username if username contains apostrophe', () => {
    const result = Username.create("user'name")
    expect(result.value).toEqual({ props: "user'name" })
  })
})

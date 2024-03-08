import { User } from './user'

describe('User Entity', () => {
  it('Should register an User on success', async () => {
    const result = User.register({
      name: 'John Doe',
      username: 'john-doe',
      pronoun: 'he/his',
      dateOfBirth: '12-31-2000'
    })

    const user = result.value as User
    expect(user.name).toBe('John Doe')
    expect(user.username).toBe('john-doe')
    expect(user.pronoun).toBe('he/his')
    expect(user.dateOfBirth).toBe('12-31-2000')
  })
})

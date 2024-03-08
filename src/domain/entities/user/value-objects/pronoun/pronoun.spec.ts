import { InvalidPronounError } from '../../errors'
import { Pronoun } from './pronoun'

describe('Pronoun ValueObject', () => {
  it('Should return InvalidPronounError if pronoun is invalid', () => {
    const result = Pronoun.create('invalid' as any)
    expect(result.value).toEqual(new InvalidPronounError('invalid'))
  })

  it('Should an Pronoun on success', () => {
    let result = Pronoun.create('he/his')
    expect(result.value).toEqual({ props: 'he/his' })

    result = Pronoun.create('she/her')
    expect(result.value).toEqual({ props: 'she/her' })

    result = Pronoun.create('they/theirs')
    expect(result.value).toEqual({ props: 'they/theirs' })
  })
})

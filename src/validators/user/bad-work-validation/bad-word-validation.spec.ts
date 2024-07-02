import { left, right } from '@/shared/either'
import { BadWordValidation } from './bad-word-validation'
describe('BadWordValidation', () => {
  const sut = new BadWordValidation()

  it('should return a error if word is bad', async () => {
    const result = sut.validate('ash0le')
    expect(result).toEqual(left(new Error('Username with bad words')))
  })

  it('should return null if word is ok', async () => {
    const result = sut.validate('apple')
    expect(result).toEqual(right())
  })
})

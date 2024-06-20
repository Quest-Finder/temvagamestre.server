import { InvalidRpgStyleError } from '../../errors'
import { RpgStyle } from './rpg-style'

describe('RPGStyle ValueObject', () => {
  it('Should return InvalidRpgStyleError if rpgStyle is invalid', () => {
    const result = RpgStyle.create('invalid')
    expect(result.value).toEqual(new InvalidRpgStyleError('invalid'))
  })

  it('Should an RpgStyle on success', () => {
    const result = RpgStyle.create('7e1e51a5-2c45-4d15-bf87-03202dfe4b7e')
    expect(result.value).toEqual({ props: '7e1e51a5-2c45-4d15-bf87-03202dfe4b7e' })
  })
})

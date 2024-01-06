import { InvalidNameError } from '../../errors'
import { Name } from './name'

describe('Name ValueObject', () => {
  it('Should remove the spaces at the beginning and at the end of the name', () => {
    const sut = Name.create(' any name ')
    expect(sut.value).toEqual({ name: 'any name' })
  })

  it('Should return InvalidNameError if name contains number', () => {
    const sut = Name.create('any 0 name')
    expect(sut.value).toEqual(new InvalidNameError('any 0 name'))
  })

  it('Should return InvalidNameError if name contains special character', () => {
    const sut = Name.create('invalid_name*')
    expect(sut.value).toEqual(new InvalidNameError('invalid_name*'))
  })

  it('Should remove spaces between words if have any', () => {
    const sut = Name.create('any  name    any  name')
    expect(sut.value).toEqual({ name: 'any name any name' })
  })

  it('Should return an Name if name is valid', () => {
    const sut = Name.create('valid name')
    expect(sut.value).toEqual({ name: 'valid name' })
  })
})

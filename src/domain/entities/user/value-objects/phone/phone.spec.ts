import { InvalidPhoneError } from '../../errors'
import { Phone } from './phone'

describe('Phone ValueObject', () => {
  it('Should remove all spaces between words if have any', () => {
    const sut = Phone.create(' 11 99125 4040 ')
    expect(sut.value).toEqual({ phone: '11991254040' })
  })

  it('Should return InvalidPhoneError if the phone contains letters', () => {
    const sut = Phone.create(' 11 99a25 4040 ')
    expect(sut.value).toEqual(new InvalidPhoneError(' 11 99a25 4040 '))
  })

  it('Should return InvalidPhoneError if phne contains special character', () => {
    const sut = Phone.create('11 9933-1020')
    expect(sut.value).toEqual(new InvalidPhoneError('11 9933-1020'))
  })

  it('Should return InvalidPhoneError if phne contains special character (2)', () => {
    const sut = Phone.create('11 99*33-1020')
    expect(sut.value).toEqual(new InvalidPhoneError('11 99*33-1020'))
  })

  it('Should return InvalidPhoneError if phne contains special character (3)', () => {
    const sut = Phone.create('119933-1020')
    expect(sut.value).toEqual(new InvalidPhoneError('119933-1020'))
  })

  it('Should return InvalidPhoneError if phne contains special character (4)', () => {
    const sut = Phone.create('(11)99331020')
    expect(sut.value).toEqual(new InvalidPhoneError('(11)99331020'))
  })

  it('Should return an Phone if phone is valid', async () => {
    const sut = Phone.create('11 99933 1020')
    expect(sut.value).toEqual({ phone: '11999331020' })
  })
})

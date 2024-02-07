import { RpgStyle } from './rpg-style'

describe('RpgStyle Entity', () => {
  it('Should return all rpg styles', () => {
    const sut = RpgStyle.getRpgStyles()
    expect(sut).toEqual(['MMORPGs'])
  })
})

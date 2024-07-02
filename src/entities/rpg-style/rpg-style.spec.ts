import { RpgStyle } from './rpg-style'

describe('RpgStyle Entity', () => {
  it('Should return all rpg styles', () => {
    const sut = RpgStyle.getRpgStyles()
    expect(sut).toEqual([
      'Fantasia Heroica',
      'Ninja vs Samurai',
      'Espada e Feitiçaria',
      'Fantasia Épica',
      'Fantasia Mítica',
      'Fantasia Sombria',
      'Intriga',
      'Mistério',
      'Guerra',
      'Nave Mãe'
    ])
  })
})

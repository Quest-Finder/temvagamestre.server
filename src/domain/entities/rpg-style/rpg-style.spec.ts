import { RpgStyle } from './rpg-style'

describe('RpgStyle Entity', () => {
  it('Should return all rpg styles', () => {
    const sut = RpgStyle.getRpgStyles()
    expect(sut).toEqual(['Fantasia',
      'Fantasia Heroica',
      'Fantasia Épica',
      'Fantasia Mística',
      'Fantasia Sombria',
      'Ninja vs Samurai',
      'Espada e Feitiçaria',
      'Intriga',
      'Guerra',
      'Nave Mãe'
    ])
  })
})

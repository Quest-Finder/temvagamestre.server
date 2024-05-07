export class RpgStyle {
  private static readonly rpgStyleNames: string[] = [
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
  ]

  static getRpgStyles (): string[] {
    return this.rpgStyleNames
  }
}

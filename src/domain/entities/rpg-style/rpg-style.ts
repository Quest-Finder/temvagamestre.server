export class RpgStyle {
  private static readonly rpgStyleNames: string[] = [
    'Fantasia', 'Fantasia Heroica', 'Fantasia Épica', 'Fantasia Mística', 'Fantasia Sombria', 'Ninja vs Samurai',
    'Espada e Feitiçaria', 'Intriga', 'Guerra', 'Nave Mãe'
  ]

  static getRpgStyles (): string[] {
    return this.rpgStyleNames
  }
}

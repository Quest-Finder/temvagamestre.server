export class RpgStyle {
  private static readonly rpgStyleNames: string[] = [
    'Fantasia', 'Fantasia Heroica', 'Fantasia Épica', 'Fantasia Mítica', 'Fantasia Sombria', 'Ninja vs Samurai',
    'Espada e Feitiçaria', 'Intriga', 'Guerra', 'Nave Mãe', 'Mistério'
  ]

  static getRpgStyles (): string[] {
    return this.rpgStyleNames
  }
}

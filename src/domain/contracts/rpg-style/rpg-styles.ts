export class RpgStyles {
  private static readonly rpgStyleNames: string [] = ['MMORPGs']

  static getRpgStyles (): string[] {
    return [...this.rpgStyleNames]
  }
}

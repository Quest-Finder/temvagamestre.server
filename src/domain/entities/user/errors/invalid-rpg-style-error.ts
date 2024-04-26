export class InvalidRpgStyleError extends Error {
  constructor (rpgStyleId: string) {
    super(`The rpgStyleId '${rpgStyleId}' is invalid`)
    this.name = 'InvalidSocialMediaError'
  }
}

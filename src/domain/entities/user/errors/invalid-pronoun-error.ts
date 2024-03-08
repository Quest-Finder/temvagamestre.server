export class InvalidPronounError extends Error {
  constructor (pronoun: string) {
    super(`The pronoun '${pronoun}' is invalid`)
    this.name = 'InvalidUsernameError'
  }
}

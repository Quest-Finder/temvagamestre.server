export class InvalidLastNameError extends Error {
  constructor (lastName: string) {
    super(`The lastName '${lastName}' is invalid`)
    this.name = 'InvalidLastNameError'
  }
}

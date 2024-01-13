export class InvalidFirstNameError extends Error {
  constructor (firstName: string) {
    super(`The firstName '${firstName}' is invalid`)
    this.name = 'InvalidFirstNameError'
  }
}

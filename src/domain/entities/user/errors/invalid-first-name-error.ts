export class InvalidFirstNameError extends Error {
  constructor (name: string) {
    super(`The firstName '${name}' is invalid`)
    this.name = 'InvalidFirstNameError'
  }
}

export class InvalidPasswordError extends Error {
  constructor () {
    super('The provided password is an invalid format')
    this.name = 'InvalidPasswordError'
  }
}

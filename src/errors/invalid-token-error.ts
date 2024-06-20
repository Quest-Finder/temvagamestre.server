export class InvalidTokenError extends Error {
  constructor () {
    super('Invalid or malformed token')
    this.name = 'InvalidTokenError'
  }
}

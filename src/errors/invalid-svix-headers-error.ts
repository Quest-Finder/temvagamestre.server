export class InvalidSvixError extends Error {
  constructor () {
    super('Invalid svix headers')
    this.name = 'InvalidSvixError'
  }
}

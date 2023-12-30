export class PhoneNotCreatedError extends Error {
  constructor () {
    super('Phone does not exist')
    this.name = 'PhoneNotCreatedError'
  }
}

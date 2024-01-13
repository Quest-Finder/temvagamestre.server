export class InvalidPhoneError extends Error {
  constructor (phone: string) {
    super(`The phone '${phone}' is invalid`)
    this.name = 'InvalidPhoneError'
  }
}

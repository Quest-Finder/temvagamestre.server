export class InvalidDateOfBirthError extends Error {
  constructor (dateOfBirth: string) {
    super(`The dateOfBirth '${dateOfBirth}' is invalid. It must be in this format: MM-DD-YYYY`)
    this.name = 'InvalidDateOfBirthError'
  }
}

export class InvalidDateOfBirthError extends Error {
  constructor (dateOfBirth: string) {
    super(`The dateOfBirth '${dateOfBirth}' is invalid. It must be in this format: MM-DD-YYYY`)
    this.name = 'InvalidDateOfBirthError'
  }
}

export class InvalidDateOfBirthleesThan18Error extends Error {
  constructor (dateOfBirth: string) {
    super(`The dateOfBirth '${dateOfBirth}' must be at least 18 years old.`)
    this.name = 'InvalidDateOfBirthLengthError'
  }
}

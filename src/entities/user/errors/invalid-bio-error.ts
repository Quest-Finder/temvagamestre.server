export class InvalidBioError extends Error {
  constructor (bio: string) {
    super(`The bio '${bio}' must be between 3 and 100 characters`)
    this.name = 'InvalidUsernameError'
  }
}

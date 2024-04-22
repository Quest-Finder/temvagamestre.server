export class InvalidTitleError extends Error {
  constructor (title: string) {
    super(`The title '${title}' must be between 3 and 100 characters`)
    this.name = 'InvalidTitleError'
  }
}

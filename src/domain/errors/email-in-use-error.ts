export class EmailInUseError extends Error {
  constructor (email: string) {
    super(`Email '${email}' is already in use.`)
    this.name = 'EmailInUseError'
  }
}

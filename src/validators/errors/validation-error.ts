export class ValidationError extends Error {
  constructor (errors: any) {
    super(errors)
    this.name = 'ValidationError'
  }
}

export class SomeFieldBeMandatoryError extends Error {
  constructor (errors: any) {
    super(errors)
    this.name = 'ValidationError'
  }
}

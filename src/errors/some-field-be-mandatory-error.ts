export class SomeFieldBeMandatoryError extends Error {
  constructor (fields: string) {
    super(`Any of the fields must be send: ${fields}`)
    this.name = 'SomeFieldBeMandatoryError'
  }
}

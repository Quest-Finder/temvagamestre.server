export type FieldError = {
  field: string
  message: string
}

export class ValidationException extends Error {
  private readonly fieldsErrors: FieldError[]

  constructor (fieldsErrors: FieldError[]) {
    super('ValidationError')
    this.fieldsErrors = fieldsErrors
  }
}

export class ExternalRequestError extends Error {
  statusCode: number
  constructor (statusCode: number, message: string, stack?: string) {
    super(message)
    this.statusCode = statusCode
    this.name = 'ExternalRequestError'
    this.stack = stack
  }
}

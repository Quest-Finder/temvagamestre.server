export class AccessTokenNotInformedError extends Error {
  constructor () {
    super('Access token not informed')
    this.name = 'TokenNotInformedError'
  }
}

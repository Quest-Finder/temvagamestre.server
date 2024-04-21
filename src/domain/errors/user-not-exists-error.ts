export class UserNotExitsError extends Error {
  constructor (userId: string) {
    super(`User with ${userId} not exists`)
    this.name = 'UserNotExitsError'
  }
}

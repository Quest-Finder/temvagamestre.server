export class NonExistentUserPreferenceError extends Error {
  constructor (userId: string) {
    super(`User '${userId}' does not have preferences.`)
    this.name = 'NonExistentUserPreferenceError'
  }
}

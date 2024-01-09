export class NonExistentUserPreferencesError extends Error {
  constructor (userId: string) {
    super(`User '${userId}' does not have preferences.`)
    this.name = 'NonExistentUserPreferencesError'
  }
}

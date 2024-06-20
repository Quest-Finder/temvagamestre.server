export class InvalidPlayerProfileIdError extends Error {
  constructor (playerProfileId: string) {
    super(`The player profile id '${playerProfileId}' is invalid`)
    this.name = 'InvalidPlayerProfileIdError'
  }
}

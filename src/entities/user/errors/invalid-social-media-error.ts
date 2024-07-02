export class InvalidSocialMediaError extends Error {
  constructor (socialMediaId: string) {
    super(`The socialMedia '${socialMediaId}' is invalid`)
    this.name = 'InvalidSocialMediaError'
  }
}

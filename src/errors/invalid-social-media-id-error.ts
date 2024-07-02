export class InvalidSocialMediaIdError extends Error {
  constructor (socialMediaId: string) {
    super(`Social media id ${socialMediaId} is invalid`)
    this.name = 'InvalidSocialMediaId'
  }
}

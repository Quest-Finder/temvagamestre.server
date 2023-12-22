export class SocialMediaExistsError extends Error {
  constructor (socialMediaName: string) {
    super(`Social media ${socialMediaName} already exists.`)
    this.name = 'SocialMediaExistsError'
  }
}

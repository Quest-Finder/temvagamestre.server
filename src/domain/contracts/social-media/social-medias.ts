export class SocialMedias {
  private static readonly socialMediaNames: string [] = ['facebook', 'instagram', 'twitter']

  static getSocialMedias (): string[] {
    return [...this.socialMediaNames]
  }
}

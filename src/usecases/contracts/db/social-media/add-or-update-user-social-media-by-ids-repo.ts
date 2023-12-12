export interface AddOrUpdateUserSocialMediaByIdsRepo {
  execute: (userId: string, socialMediaId: string) => Promise<void>
}

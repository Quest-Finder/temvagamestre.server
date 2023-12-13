import { type AddOrUpdateUserSocialMediaByIdsRepo } from '@/usecases/contracts/db/user/add-or-update-user-social-media-by-ids-repo'

export class AddOrUpdateUserSocialMediaByIdsPrismaRepo implements AddOrUpdateUserSocialMediaByIdsRepo {
  async execute (userId: string, socialMediaId: string): Promise<void> {}
}

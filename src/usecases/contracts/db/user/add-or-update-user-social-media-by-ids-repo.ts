import { type UpdateUserSocialMediaData } from '@/domain/contracts/user'

export interface AddOrUpdateUserSocialMediaByIdsRepo {
  execute: (data: UpdateUserSocialMediaData) => Promise<void>
}

import { type UserSocialMediaModel } from '@/domain/models'

export interface SaveUserSocialMediaRepo {
  execute: (data: UserSocialMediaModel) => Promise<void>
}

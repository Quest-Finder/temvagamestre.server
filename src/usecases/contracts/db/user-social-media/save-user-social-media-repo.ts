import { type UserSocialMediaModel } from '@/models'

export interface SaveUserSocialMediaRepo {
  execute: (data: UserSocialMediaModel) => Promise<void>
}

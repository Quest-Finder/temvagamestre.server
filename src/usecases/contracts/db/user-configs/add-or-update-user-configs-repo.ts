import { type UserConfigModel } from '@/domain/models'

export interface AddOrUpdateUserConfigsRepo {
  execute: (data: UserConfigModel) => Promise<void>
}

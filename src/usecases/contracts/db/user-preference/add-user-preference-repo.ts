import { type UserPreferenceModel } from '@/domain/models'

export interface AddUserPreferenceRepo {
  execute: (data: UserPreferenceModel) => Promise<void>
}

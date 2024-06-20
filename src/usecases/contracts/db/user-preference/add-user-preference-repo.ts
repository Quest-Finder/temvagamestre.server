import { type UserPreferenceModel } from '@/models'

export interface AddUserPreferenceRepo {
  execute: (data: UserPreferenceModel) => Promise<void>
}

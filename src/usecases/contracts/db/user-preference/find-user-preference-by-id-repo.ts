import { type UserPreferenceModel } from '@/models'

export interface FindUserPreferenceByIdRepo {
  execute: (id: string) => Promise<UserPreferenceModel | null>
}

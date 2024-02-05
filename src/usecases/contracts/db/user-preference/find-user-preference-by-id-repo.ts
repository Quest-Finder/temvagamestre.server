import { type UserPreferenceModel } from '@/domain/models'

export interface FindUserPreferenceByIdRepo {
  execute: (id: string) => Promise<UserPreferenceModel | null>
}

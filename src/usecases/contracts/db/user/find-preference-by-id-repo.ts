import { type PreferenceModel } from '@/domain/models'

export interface FindPreferenceByIdRepo {
  execute: (userId: string) => Promise<PreferenceModel | null>
}

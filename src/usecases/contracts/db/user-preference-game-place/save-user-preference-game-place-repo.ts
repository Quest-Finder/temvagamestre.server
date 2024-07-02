import { type UserPreferenceGamePlaceModel } from '@/models'

export interface SaveUserPreferenceGamePlaceRepo {
  execute: (data: UserPreferenceGamePlaceModel) => Promise<void>
}

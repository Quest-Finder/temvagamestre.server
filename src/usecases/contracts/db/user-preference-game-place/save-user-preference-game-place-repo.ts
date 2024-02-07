import { type UserPreferenceGamePlaceModel } from '@/domain/models'

export interface SaveUserPreferenceGamePlaceRepo {
  execute: (data: UserPreferenceGamePlaceModel) => Promise<void>
}

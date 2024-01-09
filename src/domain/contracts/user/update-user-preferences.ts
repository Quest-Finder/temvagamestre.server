import { type NonExistentUserPreferencesError } from '@/domain/errors'
import { type ActiveType, type Frequency } from '@/domain/models'
import { type Either } from '@/shared/either'

export interface UpdateUserPreferenceData {
  frequency?: Frequency
  activeType?: ActiveType
}

export type UpdateUserPreferenceResponse = Either<NonExistentUserPreferencesError, null>

export interface UpdateUserPreference {
  perform: (data: UpdateUserPreferenceData) => Promise<UpdateUserPreferenceResponse>
}

import type { NonExistentUserPreferenceError } from '@/errors'
import type { ActiveType, Frequency } from '@/models'
import type { Either } from '@/shared/either'

export interface UpdateUserPreferenceData {
  userId: string
  frequency?: Frequency
  activeType?: ActiveType
}

export type UpdateUserPreferenceResponse = Either<NonExistentUserPreferenceError, void>

export interface UpdateUserPreference {
  perform: (data: UpdateUserPreferenceData) => Promise<UpdateUserPreferenceResponse>
}

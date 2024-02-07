import type { NonExistentUserPreferenceError } from '@/domain/errors'
import type { ActiveType, Frequency } from '@/domain/models'
import type { Either } from '@/shared/either'

export interface UpdateUserPreferenceData {
  userId: string
  frequency?: Frequency
  activeType?: ActiveType
}

export type UpdateUserPreferenceResponse = Either<NonExistentUserPreferenceError, null>

export interface UpdateUserPreference {
  perform: (data: UpdateUserPreferenceData) => Promise<UpdateUserPreferenceResponse>
}

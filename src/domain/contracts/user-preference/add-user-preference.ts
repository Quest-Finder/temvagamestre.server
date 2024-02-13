import type { ExistentUserPreferenceError } from '@/domain/errors'
import type { ActiveType, Frequency } from '@/domain/models'
import type { Either } from '@/shared/either'

export interface AddUserPreferenceData {
  userId: string
  frequency: Frequency
  activeType: ActiveType
}

export type AddUserPreferenceResponse = Either<ExistentUserPreferenceError, void>

export interface AddUserPreference {
  perform: (data: AddUserPreferenceData) => Promise<AddUserPreferenceResponse>
}

import type { NonExistentUserPreferenceError } from '@/errors'
import type { Either } from '@/shared/either'

export type SaveUserPreferenceDayPeriodData = {
  userId: string
  morning: boolean
  afternoon: boolean
  night: boolean
}

export type SaveUserPreferenceDayPeriodResponse = Either<NonExistentUserPreferenceError, void>

export interface SaveUserPreferenceDayPeriod {
  perform: (data: SaveUserPreferenceDayPeriodData) => Promise<SaveUserPreferenceDayPeriodResponse>
}

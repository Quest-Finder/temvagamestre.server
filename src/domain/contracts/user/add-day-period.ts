import type { NonExistentUserPreferenceError } from '@/domain/errors'
import type { Either } from '@/shared/either'

export type AddDayPeriodData = {
  id: string
  morning: boolean
  afternoon: boolean
  night: boolean
}

export type AddDayPeriodResponse = Either<NonExistentUserPreferenceError, null>

export interface AddDayPeriod {
  perform: (data: AddDayPeriodData) => Promise<AddDayPeriodResponse>
}

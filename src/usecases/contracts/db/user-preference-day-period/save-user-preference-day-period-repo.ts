import { type UserPreferenceDayPeriodModel } from '@/models'

export interface SaveUserPreferenceDayPeriodRepo {
  execute: (data: UserPreferenceDayPeriodModel) => Promise<void>
}

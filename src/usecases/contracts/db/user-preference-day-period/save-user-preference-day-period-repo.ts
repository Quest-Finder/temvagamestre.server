import { type UserPreferenceDayPeriodModel } from '@/domain/models'

export interface SaveUserPreferenceDayPeriodRepo {
  execute: (data: UserPreferenceDayPeriodModel) => Promise<void>
}

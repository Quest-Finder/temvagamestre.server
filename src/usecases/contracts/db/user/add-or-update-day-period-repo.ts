import { type AddDayPeriodData } from '@/domain/contracts/user/add-day-period'

export interface AddOrUpdateDayPeriodRepo {
  execute: (data: AddDayPeriodData) => Promise<void>
}

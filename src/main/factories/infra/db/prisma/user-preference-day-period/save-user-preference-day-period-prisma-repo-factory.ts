import { SaveUserPreferenceDayPeriodPrismaRepo } from '@/infra/db/prisma/data/user-preference-day-period/save-user-preference-day-period/save-user-preference-day-period-prisma-repo'
import type { SaveUserPreferenceDayPeriodRepo } from '@/usecases/contracts/db/user-preference-day-period'

export const makeSaveUserPreferenceDayPeriodPrismaRepo = (): SaveUserPreferenceDayPeriodRepo => {
  return new SaveUserPreferenceDayPeriodPrismaRepo()
}

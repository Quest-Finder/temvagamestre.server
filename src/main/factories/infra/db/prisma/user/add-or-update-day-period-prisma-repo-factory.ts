import { AddOrUpdateDayPeriodPrismaRepo } from '@/infra/db/prisma/user/add-or-update-day-period/add-or-update-day-period-prisma-repo'
import { type AddOrUpdateDayPeriodRepo } from '@/usecases/contracts/db/user'

export const makeAddOrUpdateDayPeriodPrismaRepo = (): AddOrUpdateDayPeriodRepo => {
  return new AddOrUpdateDayPeriodPrismaRepo()
}

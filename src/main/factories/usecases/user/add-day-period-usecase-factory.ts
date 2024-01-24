import { type AddDayPeriod } from '@/domain/contracts/user'
import { AddDayPeriodUsecase } from '@/usecases/implementations/user/add-day-period/add-day-period-usecase'
import { makeFindPreferenceByIdPrismaRepo } from '../../infra/db/prisma/user/find-preference-by-id-prisma-repo-factory'
import { makeAddOrUpdateDayPeriodPrismaRepo } from '../../infra/db/prisma/user/add-or-update-day-period-prisma-repo-factory'

export const makeAddDayPeriodUsecase = (): AddDayPeriod => {
  return new AddDayPeriodUsecase(
    makeFindPreferenceByIdPrismaRepo(),
    makeAddOrUpdateDayPeriodPrismaRepo()
  )
}

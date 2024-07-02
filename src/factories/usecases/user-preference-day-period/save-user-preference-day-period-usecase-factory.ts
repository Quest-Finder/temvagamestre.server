import { type SaveUserPreferenceDayPeriod } from '@/contracts/user-preference-day-period'
import { makeFindUserPreferenceByIdPrismaRepo } from '../../infra/db/prisma/user-preference/find-preference-by-id-prisma-repo-factory'
import { SaveUserPreferenceDayPeriodUsecase } from '@/usecases/implementations/user-preference-day-period/save-user-preference-day-period/save-user-preference-day-period-usecase'
import { makeSaveUserPreferenceDayPeriodPrismaRepo } from '../../infra/db/prisma/user-preference-day-period/save-user-preference-day-period-prisma-repo-factory'

export const makeSaveUserPreferenceDayPeriodUsecase = (): SaveUserPreferenceDayPeriod => {
  return new SaveUserPreferenceDayPeriodUsecase(
    makeFindUserPreferenceByIdPrismaRepo(),
    makeSaveUserPreferenceDayPeriodPrismaRepo()
  )
}

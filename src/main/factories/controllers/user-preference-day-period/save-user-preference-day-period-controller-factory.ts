import { type Controller } from '@/presentation/contracts'
import { SaveUserPreferenceDayPeriodController } from '@/presentation/controllers/user-preference-day-period/save-user-preference-day-period/save-user-preference-day-period-controller'
import { SaveUserPreferenceDayPeriodZodValidation } from '@/validators/zod/user-preference-day-period/save-user-preference-day-period-zod-validation'
import { makeSaveUserPreferenceDayPeriodUsecase } from '../../usecases/user-preference-day-period/save-user-preference-day-period-usecase-factory'

export const makeSaveUserPreferenceDayPeriodController = (): Controller => {
  const validation = new SaveUserPreferenceDayPeriodZodValidation()
  return new SaveUserPreferenceDayPeriodController(
    validation, makeSaveUserPreferenceDayPeriodUsecase()
  )
}

import { type Controller } from '@/contracts'
import { SaveUserPreferenceDayPeriodController } from '@/controllers/user-preference-day-period/save-user-preference-day-period/save-user-preference-day-period-controller'
import { SaveUserPreferenceDayPeriodZodValidation } from '@/validators/user-preference-day-period/save-user-preference-day-period-zod-validation'
import { makeSaveUserPreferenceDayPeriodUsecase } from '../../usecases/user-preference-day-period/save-user-preference-day-period-usecase-factory'
import { makeLogControllerDecorator } from '../../decorators'

export const makeSaveUserPreferenceDayPeriodController = (): Controller => {
  const validation = new SaveUserPreferenceDayPeriodZodValidation()
  const controller = new SaveUserPreferenceDayPeriodController(
    validation, makeSaveUserPreferenceDayPeriodUsecase()
  )
  return makeLogControllerDecorator(controller)
}

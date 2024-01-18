import { type Controller } from '@/presentation/contracts'
import { AddDayPeriodController } from '@/presentation/controllers/user/add-day-period/add-day-period-controller'
import { AddDayPeriodZodValidation } from '@/validators/user/add-day-period/add-day-period-zod-validation'
import { makeAddDayPeriodUsecase } from '../../usecases/user/add-day-period-usecase-factory'

export const makeAddDayPeriodController = (): Controller => {
  const validation = new AddDayPeriodZodValidation()

  return new AddDayPeriodController(
    validation,
    makeAddDayPeriodUsecase()
  )
}

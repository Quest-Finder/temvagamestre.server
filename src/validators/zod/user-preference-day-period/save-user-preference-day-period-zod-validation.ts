import { type Validation } from '@/presentation/contracts'
import { type Either } from '@/shared/either'
import { ZodHelper } from '@/validators/helpers/zod-helper'
import { z } from 'zod'

export class SaveUserPreferenceDayPeriodZodValidation implements Validation {
  validate (input: any): Either<Error, null> {
    const schema = z.object({
      morning: z.boolean(),
      afternoon: z.boolean(),
      night: z.boolean()
    })
    return ZodHelper.check({ value: input, schema })
  }
}

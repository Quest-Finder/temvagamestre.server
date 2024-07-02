import { type Validation } from '@/contracts'
import { type Either } from '@/shared/either'
import { ZodHelper } from '@/helpers/zod/zod-helper'
import { z } from 'zod'

export class SaveUserPreferenceDayPeriodZodValidation implements Validation {
  validate (input: any): Either<Error, void> {
    const schema = z.object({
      morning: z.boolean(),
      afternoon: z.boolean(),
      night: z.boolean()
    })
    return ZodHelper.check({ value: input, schema })
  }
}

import { type Validation } from '@/presentation/contracts'
import { type Either } from '@/shared/either'
import { z } from 'zod'
import { ZodHelper } from '@/validators/helpers/zod-helper'

export class AddDayPeriodZodValidation implements Validation {
  async validate (input: any): Promise<Either<Error, null>> {
    const schema = z.object({
      morning: z.boolean(),
      afternoon: z.boolean(),
      night: z.boolean()
    })

    return ZodHelper.check({ value: input, schema })
  }
}

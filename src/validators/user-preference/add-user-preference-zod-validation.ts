import { type Validation } from '@/contracts'
import { type Either } from '@/shared/either'
import { z } from 'zod'
import { ZodHelper } from '@/helpers/zod/zod-helper'

export class AddUserPreferenceZodValidation implements Validation {
  validate (input: any): Either<Error, void> {
    const schema = z.object({
      frequency: z.enum(['daily', 'weekly', 'monthly']),
      activeType: z.enum(['player', 'gameMaster'])
    })
    return ZodHelper.check({ value: input, schema })
  }
}

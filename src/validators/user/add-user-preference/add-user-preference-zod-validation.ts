import { type Validation } from '@/presentation/contracts'
import { type Either } from '@/shared/either'
import { z } from 'zod'
import { ZodHelper } from '@/validators/helpers/zod-helper'

export class AddUserPreferenceValidation implements Validation {
  async validate (input: any): Promise<Either<Error, null>> {
    const schema = z.object({
      frequency: z.enum(['daily', 'weekly', 'monthly']),
      activeType: z.enum(['player', 'gameMaster'])
    })

    return ZodHelper.check({ value: input, schema })
  }
}

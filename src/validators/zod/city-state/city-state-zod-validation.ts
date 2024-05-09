import { type Validation } from '@/presentation/contracts'
import { type Either } from '@/shared/either'
import { ZodHelper } from '@/validators/helpers/zod-helper'
import { z } from 'zod'

export class CityStateValidation implements Validation {
  validate (input: any): Either<Error, void> {
    const schema = z.object({
      uf: z.string().length(2)
    })
    return ZodHelper.check({ value: input, schema })
  }
}

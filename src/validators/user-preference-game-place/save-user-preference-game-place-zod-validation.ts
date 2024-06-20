import { type Validation } from '@/contracts'
import { type Either } from '@/shared/either'
import { z } from 'zod'
import { ZodHelper } from '@/helpers/zod/zod-helper'

export class SaveUserPreferenceGamePlaceZodValidation implements Validation {
  validate (input: any): Either<Error, void> {
    const schema = z.object({
      online: z.boolean(),
      inPerson: z.boolean()
    })
    return ZodHelper.check({ value: input, schema })
  }
}

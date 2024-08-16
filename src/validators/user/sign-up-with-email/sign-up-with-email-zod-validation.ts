import type { Validation } from '@/contracts'
import type { Either } from '@/shared/either'
import { ZodHelper } from '@/helpers/zod/zod-helper'
import { z } from 'zod'

export class SignUpWithEmailZodValidation implements Validation {
  validate (input: any): Either<Error, void> {
    const schema = z.object({
      email: z.string().email(),
      password: z.string().min(6)
    })
    return ZodHelper.check({ value: input, schema })
  }
}

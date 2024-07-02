import type { Validation } from '@/contracts'
import type { Either } from '@/shared/either'
import { ZodHelper } from '@/helpers/zod/zod-helper'
import { z } from 'zod'

export class CheckUsernameZodValidation implements Validation {
  validate (input: any): Either<Error, void> {
    const schema = z.string().max(15)
    return ZodHelper.check({ value: input, schema })
  }
}

import type { Validation } from '@/contracts'
import type { Either } from '@/shared/either'
import { ZodHelper } from '@/helpers/zod/zod-helper'
import { z } from 'zod'
import type { SignUpWithEmailDto } from '@/users/sign-up/sign-up-with-email-dto'

export class SignUpWithEmailZodValidation implements Validation {
  validate (input: SignUpWithEmailDto): Either<Error, void> {
    const schema = z.object({
      email: z.string().email(),
      password: z.string().min(6)
    })
    return ZodHelper.check({ value: input, schema })
  }
}

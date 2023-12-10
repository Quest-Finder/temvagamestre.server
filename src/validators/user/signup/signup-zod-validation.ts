import type { Validation } from '@/presentation/contracts'
import type { Either } from '@/shared/either'
import { ZodHelper } from '@/validators/helpers/zod-helper'
import { z } from 'zod'

export class SignUpZodValidation implements Validation {
  async validate (input: any): Promise<Either<Error, null>> {
    const schema = z.object({
      externalAuthUserId: z.string(),
      firstName: z.string().min(2).max(25),
      lastName: z.string().min(2).max(50),
      email: z.string().email(),
      phone: z.string().min(11).max(20).optional(),
      dateOfBirth: z.date()
    })
    return ZodHelper.check({ value: input, schema })
  }
}

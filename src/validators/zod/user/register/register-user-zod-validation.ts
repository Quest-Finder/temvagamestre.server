import type { Validation } from '@/presentation/contracts'
import { type Either } from '@/shared/either'
import { ZodHelper } from '@/validators/helpers/zod-helper'
import { z } from 'zod'

export class RegisterUserZodValidation implements Validation {
  validate (input: any): Either<Error, void> {
    const schema = z.object({
      name: z.string().min(3).max(30),
      username: z.string().min(1).max(15),
      pronoun: z.string(),
      dateOfBirth: z.string().min(10).max(10),
      socialMedias: z.array(z.object({
        socialMediaId: z.string(),
        userLink: z.string()
      })).optional()
    })
    return ZodHelper.check({ value: input, schema })
  }
}

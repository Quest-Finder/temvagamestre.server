import type { Validation } from '@/presentation/contracts'
import type { Either } from '@/shared/either'
import { ZodHelper } from '@/validators/helpers/zod-helper'
import { z } from 'zod'

export class AuthZodValidation implements Validation {
  async validate (input: any): Promise<Either<Error, null>> {
    const schema = z.object({
      accessToken: z.string().regex(
        /^([A-Za-z0-9-_]+?\.[A-Za-z0-9-_]+?\.?[A-Za-z0-9-_.+/=]*?)$/,
        'Invalid JWT token'
      )
    })
    return ZodHelper.check({ value: input, schema })
  }
}

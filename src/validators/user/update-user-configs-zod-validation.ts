import { type Validation } from '@/presentation/contracts'
import { type Either } from '@/shared/either'
import { z } from 'zod'
import { ZodHelper } from '../helpers/zod-helper'

export class UpdateUserConfigsZodValidation implements Validation {
  async validate (input: any): Promise<Either<Error, null>> {
    const schema = z.object({
      allowMessage: z.boolean()
    })
    return ZodHelper.check({ schema, value: input })
  }
}

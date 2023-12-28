import { type Validation } from '@/presentation/contracts'
import { type Either } from '@/shared/either'
import { z } from 'zod'
import { ZodHelper } from '@/validators/helpers/zod-helper'

export class UpdateUserSocialMediaValidation implements Validation {
  async validate (input: any): Promise<Either<Error, null>> {
    const schema = z.object({
      socialMediaId: z.string(),
      link: z.string()
    })

    return ZodHelper.check({ value: input, schema })
  }
}

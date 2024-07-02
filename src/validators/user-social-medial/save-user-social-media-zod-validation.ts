import { type Validation } from '@/contracts'
import { type Either } from '@/shared/either'
import { z } from 'zod'
import { ZodHelper } from '@/helpers/zod/zod-helper'

export class SaveUserSocialMediaValidation implements Validation {
  validate (input: any): Either<Error, void> {
    const schema = z.object({
      socialMediaId: z.string(),
      link: z.string()
    })
    return ZodHelper.check({ value: input, schema })
  }
}

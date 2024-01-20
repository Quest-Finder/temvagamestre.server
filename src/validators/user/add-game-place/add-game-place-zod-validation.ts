import { type Validation } from '@/presentation/contracts'
import { type Either } from '@/shared/either'
import { z } from 'zod'
import { ZodHelper } from '@/validators/helpers/zod-helper'

export class AddGamePlaceZodValidation implements Validation {
  async validate (input: any): Promise<Either<Error, null>> {
    const schema = z.object({
      online: z.boolean(),
      inPerson: z.boolean()
    })

    return ZodHelper.check({ value: input, schema })
  }
}

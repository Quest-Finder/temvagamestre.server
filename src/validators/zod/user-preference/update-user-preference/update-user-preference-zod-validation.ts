import { type Validation } from '@/presentation/contracts'
import { left, type Either } from '@/shared/either'
import { z } from 'zod'
import { ZodHelper } from '@/validators/helpers/zod-helper'
import { SomeFieldBeMandatoryError } from '@/validators/errors'

export class UpdateUserPreferenceZodValidation implements Validation {
  validate (input: any): Either<Error, void> {
    const mandatoryFields = ['activeType', 'frequency']

    if (mandatoryFields.every(field => !input[field])) {
      return left(new SomeFieldBeMandatoryError(mandatoryFields.join(', ')))
    }

    const schema = z.object({
      frequency: z.enum(['daily', 'weekly', 'monthly']).optional(),
      activeType: z.enum(['player', 'gameMaster']).optional()
    })
    return ZodHelper.check({ value: input, schema })
  }
}

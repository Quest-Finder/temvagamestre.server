import type { Validation } from '@/presentation/contracts'
import { left, type Either } from '@/shared/either'
import { SomeFieldBeMandatoryError } from '@/validators/errors'
import { ZodHelper } from '@/validators/helpers/zod-helper'
import { z } from 'zod'

export class UpdateUserZodValidation implements Validation {
  validate (input: any): Either<Error, null> {
    const mandatoryFields = ['firstName', 'lastName', 'nickname', 'phone', 'dateOfBirth']
    if (mandatoryFields.every(field => !input[field])) {
      return left(new SomeFieldBeMandatoryError(mandatoryFields.join(', ')))
    }
    const schema = z.object({
      firstName: z.string().min(2).max(25).optional(),
      lastName: z.string().min(2).max(50).optional(),
      nickname: z.string().min(5).max(25).optional(),
      phone: z.string().min(11).max(20).optional(),
      dateOfBirth: z.string().min(10).max(10).optional()
    })
    return ZodHelper.check({ value: input, schema })
  }
}

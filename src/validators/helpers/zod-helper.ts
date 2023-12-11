import { left, right, type Either } from '@/shared/either'
import { ZodError, type ZodSchema } from 'zod'
import { ValidationError } from '../errors/validation-error'
import { fromZodError } from 'zod-validation-error'

export type ZodHelperData = {
  value: any
  schema: ZodSchema
}

export class ZodHelper {
  static check (data: ZodHelperData): Either<Error, null> {
    try {
      data.schema.parse(data.value)
      return right(null)
    } catch (error: any) {
      if (error instanceof ZodError) {
        return left(new ValidationError(fromZodError(error)))
      }
      return left(error)
    }
  }
}

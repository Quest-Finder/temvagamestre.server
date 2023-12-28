import { left, right, type Either } from '@/shared/either'
import { ZodError, type ZodSchema } from 'zod'
import { fromZodError } from 'zod-validation-error'
import { ValidationError } from '@/validators/errors/validation-error'

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

import { left, right, type Either } from '@/shared/either'
import { ValidationError } from '@/validators/errors/validation-error'
import { ZodError } from 'zod'
import { fromZodError } from 'zod-validation-error'
import { type ZodHelperData } from '../types/zod-helper-data'

export class ZodHelper {
  static check (data: ZodHelperData): Either<Error, void> {
    try {
      data.schema.parse(data.value)
      return right()
    } catch (error: any) {
      if (error instanceof ZodError) {
        return left(new ValidationError(fromZodError(error)))
      }
      return left(error)
    }
  }
}

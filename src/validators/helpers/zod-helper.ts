import { left, right, type Either } from '@/shared/either'
import type { ZodSchema } from 'zod'

export class ZodHelper {
  constructor (private readonly schema: ZodSchema) {}

  check (value: any): Either<Error, null> {
    try {
      this.schema.parse(value)
      return right(null)
    } catch (error: any) {
      return left(error)
    }
  }
}

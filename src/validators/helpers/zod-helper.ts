import { left, right, type Either } from '@/shared/either'
import type { ZodSchema } from 'zod'

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
      return left(error)
    }
  }
}

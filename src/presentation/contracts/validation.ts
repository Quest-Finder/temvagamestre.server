import type { Either } from '@/shared/either'

export interface Validation {
  validate: (input: any) => Either<Error, null>
}

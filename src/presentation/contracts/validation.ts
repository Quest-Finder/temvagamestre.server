import type { Either } from '@/shared/either'

export interface Validation {
  validate: (input: any) => Promise<Either<Error, null>>
}
